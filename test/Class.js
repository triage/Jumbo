const Class = artifacts.require("../contracts/Class.sol")
const Studio = artifacts.require("../contracts/Studio.sol")

let barrys = { contactDetails: "135 W 20th St, New York, NY 10011" }
let legsAss = { name: "Legs & Ass", description: "Squats, squats, squats and more squats." }

contract("Class", (accounts) => {
	barrys.from = accounts[0]

	it("should create class", (done) => {
		barrys.instance = Studio.deployed()
		Class.new(
			barrys.instance.address,
			legsAss.name,
			legsAss.description,
			{ from: barrys.from }
		).then(
			(address) => {
				legsAss.instance = address
				return legsAss.instance.name.call()
			}
		).then(
			(name) => {
				assert.equal(name, legsAss.name, `expected name to equal ${legsAss.name} but got ${name}`)
				return legsAss.instance.description.call()
			}
		).then(
			(description) => {
				assert.equal(description, legsAss.description, `expected description to equal ${legsAss.description} but got ${description}`)
				done()
			}
		)
	})

	it("should be able to update name, description", (done) => {
		barrys.instance = Studio.deployed()
		Class.new(
			barrys.instance.address,
			"",
			"",
			{ from: barrys.from }
		).then(
			(address) => {
				legsAss.instance = address
				return legsAss.instance.setName(legsAss.name, { from: barrys.from })
			}
		).then(
			() => {
				return legsAss.instance.name.call()
			}
		).then(
			(name) => {
				assert.equal(name, legsAss.name, `expected name to equal ${legsAss.name} but got ${name}`)
				return legsAss.instance.setDescription(legsAss.description, {from: barrys.from})
			}
		).then(
			() => {
				return legsAss.instance.description.call()
			}
		).then(
			(description) => {
				assert.equal(description, legsAss.description, `expected description to equal ${legsAss.description} but got ${description}`)
				done()
			}
		)
	})
})
