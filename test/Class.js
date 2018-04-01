const Class = artifacts.require("../contracts/Class.sol")
const Studio = artifacts.require("../contracts/Studio.sol")

let barrys = { contactDetails: "135 W 20th St, New York, NY 10011" }
let studio = {}
let legsAss = { name: "Legs & Ass", description: "Squats, squats, squats and more squats." }

contract("Class", (accounts) => {
	barrys.from = accounts[0]

	it("should create class", done => {
		Studio.deployed().then(instance => {
			studio.instance = instance
		}).then(() => {
			return studio.instance.classCreate(
				legsAss.name,
				legsAss.description,
				{ from: barrys.from }
			)
		}).then(() => {
			return studio.instance.classesCount(barrys.from)
		}).then(count => {
			return studio.instance.classAtIndex(barrys.from, count - 1)
		}).then(address => {
			legsAss.instance = Class.at(address);
			return legsAss.instance.name.call()
		}).then(name => {
			assert.equal(name, legsAss.name)
			return legsAss.instance.description.call()
		}).then(description => {
			assert.equal(description, legsAss.description)
			done()
		})
	})

	it("should be able to update name, description", done => {
		Studio.deployed().then(instance => {
			studio.instance = instance
		}).then(() => {
			return studio.instance.classCreate(
				legsAss.name,
				legsAss.description,
				{ from: barrys.from }
			)	
		}).then(() => {
			return studio.instance.classesCount(barrys.from)
		}).then(count => {
			return studio.instance.classAtIndex(barrys.from, count - 1)
		}).then(address => {
			legsAss.instance = Class.at(address);
			return legsAss.instance.setName(legsAss.name, { from: barrys.from })
		}).then(() => {
			return legsAss.instance.name.call()
		}).then(name => {
			assert.equal(name, legsAss.name)
			return legsAss.instance.setDescription(legsAss.description, {from: barrys.from})
		}).then(() => {
			return legsAss.instance.description.call()
		}).then(description => {
			assert.equal(description, legsAss.description)
			done()
		})
	})
})
