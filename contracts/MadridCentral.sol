pragma solidity >=0.4.17 <=0.6.0;

contract MadridCentral {
    
    struct NewResident {
        uint new_price;
        uint old_price;
        uint invitations;
        address addr;
        bool isNew;
    }
    
    // permanentes
    mapping (address => Resident) private residents;
    mapping (uint => Day) private dayContracts;
    mapping (address => uint) private balances;
    uint[] private prices = [5000000000000000, 10000000000000000, 15000000000000000, 20000000000000000, 25000000000000000];
    
    // temporales
    mapping (uint => Resident[]) private invitationsPerPrice;
    NewResident[] private newResidents;
    uint private currentDay = 0;
    uint[5] private pointers;
    uint[5] private lengths;
    uint private currentDayPriceIndex = 0;
    mapping (address => uint) private invitationsPerResident;
    
    //solo para el metodo 
    uint private price;
    uint private index;
    
    function getInvitationsForPrice(uint p) public view returns (Resident[] memory){
        return invitationsPerPrice[p];
    }

    function getCurrentDay() public view returns (uint) {
        return currentDay;
    }
    
    function addResident(uint initialPrice, string memory name, string memory email, string memory code, uint phone, uint n_invitations) public {
        require(address(residents[msg.sender]) == address(0x0));
        Resident resident = new Resident(initialPrice, msg.sender, name, email, code, phone, n_invitations );
        residents[msg.sender] = resident;
        invitationsPerResident[address(resident)] = n_invitations;
        newResidents.push(NewResident(initialPrice, 0, n_invitations, address(resident), true));
    }
    
    function changeResidentData(string memory name, string memory email, uint phone, uint newPrice, uint nInvitations) public {
        Resident resident = residents[msg.sender];
        resident.setName(name, address(resident));
        resident.setEmail(email, address(resident));
        resident.setPhone(phone, address(resident));
        uint oldPrice = resident.getPrice();
        resident.setPrice(newPrice, address(resident));
        resident.setInvitations(nInvitations, address(resident));
        invitationsPerResident[address(resident)] = nInvitations;
        newResidents.push(NewResident(newPrice, oldPrice, nInvitations, address(resident), false));
    }

    function getResidentAddress() public view returns (address) {
        return address(residents[msg.sender]);
    }

    function getTodayAddress() public view returns (address) {
        return address(dayContracts[currentDay]);
    }
    
    function residentExists() public view returns (bool) {
        if (address(residents[msg.sender]) == address(0x0)) {
            return false;
        }
        return true;
    }
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    } 
    
    function withdraw() public {
        msg.sender.transfer(balances[msg.sender]);
        balances[msg.sender] = 0;
    }
    
    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }
    
    function transfer(address sender, address receiver, uint amount) private {
        require( balances[sender] >= amount, "Saldo insuficiente");
        balances[sender] -= amount;
        balances[receiver] += amount;
    }
    
    function spendInvitation(Resident resident) private {
        Day day_n = dayContracts[currentDay];
        day_n.setSpentInvitations(address(resident), day_n.getSpentInvitations(address(resident)) + 1);
    }
    
    function lookForResident() private returns (bool) {
        for (uint i = currentDayPriceIndex; i < 5; i++) {
            if (lengths[i] > 0) {
                for (uint j = pointers[i]; j < invitationsPerPrice[prices[i]].length + pointers[i]; j++) {
                    address residentAddress = address(invitationsPerPrice[prices[i]][j % invitationsPerPrice[prices[i]].length]);
                    if (invitationsPerResident[residentAddress] - dayContracts[currentDay].getSpentInvitations(residentAddress) > 1) {
                        price = i;
                        index = j % invitationsPerPrice[prices[i]].length;
                        return true;
                    } else if (invitationsPerResident[residentAddress] - dayContracts[currentDay].getSpentInvitations(residentAddress) == 1) {
                        price = i;
                        index = j % invitationsPerPrice[prices[i]].length;
                        lengths[i]--;
                        pointers[i] = j + 1;
                        return true;
                    }
                }
            } else {
                currentDayPriceIndex = i + 1;
            }
        }
        return false;
    }
    
    function getInvitation(uint day, string memory matricula) public {
        require(balances[msg.sender] >= prices[4], "Debes disponer del saldo suficiente para pagar el precio más caro.");
        if (day == currentDay) {
            if (lookForResident()) {
                Resident resident = invitationsPerPrice[prices[price]][index];
                dayContracts[currentDay].newInvitation(msg.sender, matricula, resident);
                spendInvitation(resident);
                transfer(msg.sender, resident.getPersonalAddress(), prices[price]);
            } else {
                revert("No hay ningun residente con invitaciones");
            }
        } else {
            generateNewDay(day);
            newDaySettings();
            if (lookForResident()) {
                Resident resident = invitationsPerPrice[prices[price]][index];
                dayContracts[currentDay].newInvitation(msg.sender, matricula, resident);
                spendInvitation(resident);
                transfer(msg.sender, resident.getPersonalAddress(), prices[price]);
            } else {
                revert("No hay ningun residente con invitaciones (dia nuevo)");
            }
        }
    }

    function newDaySettings() public {
        for (uint i = 0; i < 5; i++) {
            lengths[i] = invitationsPerPrice[prices[i]].length;
            pointers[i] = block.timestamp;
        }
        currentDayPriceIndex = 0;
        price = 0;
        index = 0;
    }
    
    function getInvitationFromDay(uint day) public view returns (string memory) {
        Day searchedDay = dayContracts[day];
        return searchedDay.getTodayInvitation(msg.sender);
    }

    function getInvitationFromToday() public view returns (string memory) {
        Day searchedDay = dayContracts[currentDay];
        return searchedDay.getTodayInvitation(msg.sender);
    }
    
    function generateNewDay(uint day) public {
        currentDay = day;
        dayContracts[currentDay] = new Day();
        
        for (uint i = 0; i < newResidents.length; i ++) {
            if (newResidents[i].isNew) {
                invitationsPerPrice[newResidents[i].new_price].push(Resident(newResidents[i].addr));
            } else {
                if (newResidents[i].old_price != newResidents[i].new_price) {
                    if (newResidents[i].invitations > 0) {
                        invitationsPerPrice[newResidents[i].new_price].push(Resident(newResidents[i].addr));
                    }
                    for (uint j = 0; j < invitationsPerPrice[newResidents[i].old_price].length; j++) {
                        if (address(invitationsPerPrice[newResidents[i].old_price][j]) == newResidents[i].addr) {
                            Resident a = invitationsPerPrice[newResidents[i].old_price][j];
                            invitationsPerPrice[newResidents[i].old_price][j] = invitationsPerPrice[newResidents[i].old_price][invitationsPerPrice[newResidents[i].old_price].length - 1];
                            invitationsPerPrice[newResidents[i].old_price][invitationsPerPrice[newResidents[i].old_price].length - 1] = a;
                            invitationsPerPrice[newResidents[i].old_price].pop();
                            break;
                        }
                    }
                }
            }
        }
        delete newResidents;
    }
}

contract Day {
    
    struct Invitation {
        Resident resident;
        string matricula;
    }
    //direccion del residente
    mapping (address => uint) private spentInvitations;

    //direccion personal
    mapping (address => Invitation) private invitations;
    
    function newInvitation(address sender, string memory matricula, Resident resident) public {
        invitations[sender] = Invitation(resident, matricula);
    }

    function getSpentInvitations(address addr) public view returns (uint) {
        return spentInvitations[addr];
    }

    function getTodayInvitation(address sender) public view returns (string memory) {
        return invitations[sender].matricula;
    }

    function setSpentInvitations(address addr, uint inv) public {
        spentInvitations[addr] = inv;
    }
}

contract Resident {
    string private name;
    string private email;
    string private code;
    uint private phone;
    uint private price;
    uint private n_invitations;
    address private personalAddress;
    
    constructor(uint p, address sender, string memory _name, string memory _email, string memory _code, uint _phone, uint _n_invitations) public {
        name = _name;
        email = _email;
        code = _code;
        phone = _phone;
        n_invitations = _n_invitations;
        price = p;
        personalAddress = sender;
    }
    

    function getPersonalAddress() public view returns (address) {
        return personalAddress;
    }
    
    function setName(string memory n, address sender) public {
        require(sender == address(this));
        name = n;
    }

    function getName() public view returns (string memory) {
        return name;
    }
    
    function setEmail(string memory e, address sender) public {
        require(sender == address(this));
        email = e;
    }
    
    function getEmail() public view returns (string memory) {
        return email;
    }
    
    function setPhone(uint p, address sender) public {
        require(sender == address(this));
        phone = p;
    }
    
    function getPhone() public view returns (uint) {
        return phone;
    }
    
    function getCode() public view returns (string memory) {
        return code;
    }
    
    function getPrice() public view returns (uint) {
        return price;
    }
    
    function setPrice(uint p, address sender) public {
        require(sender == address(this));
        price = p;
    }
    
    function setInvitations(uint i, address sender) public {
        require(sender == address(this));
        n_invitations = i;
    }
    
    function getInvitations() public view returns (uint) {
        return n_invitations;
    }
    
}