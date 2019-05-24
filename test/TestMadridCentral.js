var MadridCentral = artifacts.require("./contracts/MadridCentral.sol");
var Resident = artifacts.require("./contracts/Resident.sol");
var Day = artifacts.require("./contracts/Day.sol");

contract("Usamos MadridCentral:", accounts => {

	let madridCentral;

	before(async() => {
		madridCentral = await MadridCentral.deployed();
	});

	it("crea correctamente un residente", async () => {
		await madridCentral.addResident(5000000000000000, "Rodri", "r@r", "password", 666778899, 10, {from: accounts[0], gas: 5000000, gasPrice: '30000000'});
		const residentAddress = await madridCentral.getResidentAddress.call();
		const resident = await Resident.at(residentAddress);
		const name = await resident.getName.call();
		assert.equal(name, "Rodri", "No se ha accedido correctamente al contrato");
	});

	it("crea correctamente un nuevo día", async () => {
		const day0Address = await madridCentral.getTodayAddress.call();
		await madridCentral.generateNewDay(1, {from: accounts[0], gas: 5000000, gasPrice: '30000000'});
		const day1Address = await madridCentral.getTodayAddress.call();
		assert.notEqual(day0Address, day1Address, "No se ha accedido correctamente al contrato");
	});
});

