
const Web3 = require("Web3");
const TruffleContract = require("truffle-contract");

// Cargar los artefactos de los contratos (json)
const json = require("../build/contracts/MadridCentral.json");
const json2 = require("../build/contracts/Day.json");

// Crear la abstraccion de los contratos
const MadridCentral = TruffleContract(json);
const Day = TruffleContract(json2);

//  Ganache es el proveedor de Web3.
let web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');

// Provisionar los contratos con el proveedor web3
MadridCentral.setProvider(web3Provider);
Day.setProvider(web3Provider);

// Instancia de Web3
let web3 = new Web3(web3Provider);

web3.eth.net.isListening()
.catch(() => {
    throw new Error("No puedo conectar con el nodo Ethereum.");
})
.then(async () => {
    console.log('Estoy conectado con el nodo Ethereum.');

    // Workaround for a compatibility issue between web3@1 and truffle-contract@3.0.x
    if (typeof MadridCentral.currentProvider.sendAsync !== "function") {
        MadridCentral.currentProvider.sendAsync = function() {
            return MadridCentral.currentProvider.send.apply(
                MadridCentral.currentProvider, arguments
            );
        };
    }

    if (typeof Day.currentProvider.sendAsync !== "function") {
        Day.currentProvider.sendAsync = function() {
            return Day.currentProvider.send.apply(
                Day.currentProvider, arguments
            );
        };
    }

    // Obtención de las cuentas del proveedor
    const accounts = await web3.eth.getAccounts();


    if (accounts.length == 0) {
        throw new Error("No hay cuentas.");
    }  
    const account = accounts[0];
    console.log("Cuenta de usuario =", account);

    // Obtener el contrato desplegado
    const madridCentral = await MadridCentral.deployed();


    console.log("Dirección del Contrato =", madridCentral.address);

    await madridCentral.addResident(5000000000000000, "Rodri", "r@r", "password", 666778899, 1, {from: accounts[1], gas: 5000000, gasPrice: '30000000'});
    await madridCentral.addResident(5000000000000000, "Rodri", "r@r", "password", 666778899, 1, {from: accounts[2], gas: 5000000, gasPrice: '30000000'});
    await madridCentral.addResident(5000000000000000, "Rodri", "r@r", "password", 666778899, 1, {from: accounts[3], gas: 5000000, gasPrice: '30000000'});

    const resident1 = await madridCentral.residents.call(accounts[1]);
    const resident2 = await madridCentral.residents.call(accounts[2]);
    const resident3 = await madridCentral.residents.call(accounts[3]);

    console.log("Resident 1 = ", resident1);
    console.log("Resident 2 = ", resident2);
    console.log("Resident 3 = ", resident3);

    const currentDay0 = await madridCentral.currentDay.call();
    console.log("Current Day = ",currentDay0.toNumber());

    await madridCentral.deposit({from: accounts[10], gas: 5000000, gasPrice: '30000000', value: 50000000000000000});
    await madridCentral.deposit({from: accounts[9], gas: 5000000, gasPrice: '30000000', value: 50000000000000000});
    await madridCentral.deposit({from: accounts[8], gas: 5000000, gasPrice: '30000000', value: 50000000000000000});
    await madridCentral.deposit({from: accounts[7], gas: 5000000, gasPrice: '30000000', value: 50000000000000000});
    await madridCentral.deposit({from: accounts[6], gas: 5000000, gasPrice: '30000000', value: 50000000000000000});
    await madridCentral.deposit({from: accounts[5], gas: 5000000, gasPrice: '30000000', value: 50000000000000000});
console.log("HOLA");
    await madridCentral.getInvitation(1, "AV2845H", {from: accounts[9], gas: 5000000, gasPrice: '30000000'});
    console.log("HOLA");
    await madridCentral.getInvitation(1, "4580FLB", {from: accounts[8], gas: 5000000, gasPrice: '30000000'});
    await madridCentral.getInvitation(1, "7673KTC", {from: accounts[7], gas: 5000000, gasPrice: '30000000'});

    const currentDay = await madridCentral.currentDay.call();
    console.log("Current Day = ",currentDay.toNumber());

    const dayContract = await madridCentral.dayContracts.call(currentDay);
    console.log("Dirección día 1 = ", dayContract);

    const day1 = await Day.at(dayContract);

    const invitation1 = await day1.invitations.call(accounts[9]);
    const invitation2 = await day1.invitations.call(accounts[8]);
    const invitation3 = await day1.invitations.call(accounts[7]);

    console.log("Invitación 1 del día 1 = ", invitation1);
    console.log("Invitación 2 del día 1 = ", invitation2);
    console.log("Invitación 3 del día 1 = ", invitation3);

    await madridCentral.addResident(5000000000000000, "Rodri", "r@r", "passord", 666778899, 1, {from: accounts[4], gas: 5000000, gasPrice: '300000000'});
    const resident4 = await madridCentral.residents.call(accounts[4]);
    console.log("Resident 4 = ", resident4);

    await madridCentral.changeResidentData("Rodri", "r@r", 646490360, 15000000000000000, 1, {from: accounts[3], gas: 5000000, gasPrice: '300000000'});

    await madridCentral.getInvitation(2, "1234BBB", {from: accounts[9], gas: 50000000, gasPrice: '300000'});
    await madridCentral.getInvitation(2, "1234CCC", {from: accounts[8], gas: 50000000, gasPrice: '300000'});
    await madridCentral.getInvitation(2, "1234DDD", {from: accounts[7], gas: 50000000, gasPrice: '300000'});
    await madridCentral.getInvitation(2, "1234FFF", {from: accounts[6], gas: 50000000, gasPrice: '300000'});

    const currentDay2 = await madridCentral.currentDay.call();
    console.log("Current Day = ",currentDay2.toNumber());

    const dayContract2 = await madridCentral.dayContracts.call(currentDay2);
    console.log("Dirección día 2 = ", dayContract2);

    const day2 = await Day.at(dayContract2);

    const invitation21 = await day2.invitations.call(accounts[9]);
    const invitation22 = await day2.invitations.call(accounts[8]);
    const invitation23 = await day2.invitations.call(accounts[7]);
    const invitation24 = await day2.invitations.call(accounts[6]);
    const invitation25 = await day2.invitations.call(accounts[5]);
    const invitation26 = await day2.invitations.call(accounts[10]);

    console.log("Invitación 1 del día 2 = ", invitation21);
    console.log("Invitación 2 del día 2 = ", invitation22);
    console.log("Invitación 3 del día 2 = ", invitation23);
    console.log("Invitación 4 del día 2 = ", invitation24);

    const balance10 = await madridCentral.getBalance({from: accounts[10], gas: 50000000, gasPrice: '300000'});
    const balance9 = await madridCentral.getBalance({from: accounts[9], gas: 50000000, gasPrice: '300000'});
    const balance8 = await madridCentral.getBalance({from: accounts[8], gas: 50000000, gasPrice: '300000'});
    const balance7 = await madridCentral.getBalance({from: accounts[7], gas: 50000000, gasPrice: '300000'});
    const balance6 = await madridCentral.getBalance({from: accounts[6], gas: 50000000, gasPrice: '300000'});
    const balance5 = await madridCentral.getBalance({from: accounts[5], gas: 50000000, gasPrice: '300000'});
    const balance4 = await madridCentral.getBalance({from: accounts[4], gas: 50000000, gasPrice: '300000'});
    const balance3 = await madridCentral.getBalance({from: accounts[3], gas: 50000000, gasPrice: '300000'});
    const balance2 = await madridCentral.getBalance({from: accounts[2], gas: 50000000, gasPrice: '300000'});
    const balance1 = await madridCentral.getBalance({from: accounts[1], gas: 50000000, gasPrice: '300000'});

    console.log("Saldo del Residente 1 = ", balance1.toNumber()/1000000000000000);
    console.log("Saldo del Residente 2 = ", balance2.toNumber()/1000000000000000);
    console.log("Saldo del Residente 3 = ", balance3.toNumber()/1000000000000000);
    console.log("Saldo del Residente 4 = ", balance4.toNumber()/1000000000000000);
    console.log("Saldo de la cuenta 5 = ", balance5.toNumber()/1000000000000000);
    console.log("Saldo de la cuenta 6 = ", balance6.toNumber()/1000000000000000);
    console.log("Saldo de la cuenta 7 = ", balance7.toNumber()/1000000000000000);
    console.log("Saldo de la cuenta 8 = ", balance8.toNumber()/1000000000000000);
    console.log("Saldo de la cuenta 9 = ", balance9.toNumber()/1000000000000000);
    console.log("Saldo de la cuenta 10 = ", balance10.toNumber()/1000000000000000);

})
.catch(error => {
    console.log(error);
}).then(() => {
    console.log("FIN");
});
