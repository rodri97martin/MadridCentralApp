
// Generación de una nueva transacción para añadir un residente
await madridCentral.addResident(5000000000000000, "Rodri", "r@r", "password", 666778899, 10, {from: accounts[1], gas: 5000000, gasPrice: '30000000'});

// Llamada para obtener el residente con esa dirección
const resident1 = await madridCentral.residents.call(accounts[1]);

// Llamada para obtener el día actual
const currentDay0 = await madridCentral.currentDay.call();

// Generación de una transacción para ingresar 15000 wei desde una determinada dirección
await madridCentral.deposit({from: accounts[10], gas: 5000000, gasPrice: '30000000', value: 15000});

// Generación de una transacción para pedir una invitación para el día 1 para una matrícula
await madridCentral.getInvitation(1, "1234BCD", {from: accounts[10], gas: 5000000, gasPrice: '30000000'});

// Llamada para obtener la direccion del contrato del día actual
const dayContract = await madridCentral.dayContracts.call(currentDay);

// Obtención de la instancia del contrato Day en una dirección 
const day1 = await Day.at(dayContract);

// Llamada para obtener una invitación de un día para una dirección
const invitation1 = await day1.invitations.call(accounts[10]);

// Generación de una transacción para cambiar los datos de un residente
await madridCentral.changeResidentData("Rodri", "r@r", 666778899, 10000000000000000, 3, {from: accounts[1], gas: 5000000, gasPrice: '300000000'});

// LLamada para obtener el saldo de una determinada cuenta
const balance10 = await madridCentral.getBalance({from: accounts[10], gas: 50000000, gasPrice: '300000'});

