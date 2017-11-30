let barrys = { contactDetails: "135 W 20th St, New York, NY 10011" }
let classpass = {}

const Reseller = artifacts.require("./Reseller.sol")
const Studio = artifacts.require("./Studio.sol")
const Class = artifacts.require("./Class.sol")
const schedule = 0x123
const studio = {}
const reseller = {}

contract("Studio", (accounts) => {
	barrys.from = accounts[0]
	classpass.from = accounts[1]

	before(done => {
		Studio.deployed().then(deployed => {
			studio.deployed = deployed
			return Reseller.deployed()
		}).then(deployed => {
			reseller.deployed = deployed
			return studio.deployed.signup("Barry's", { from: barrys.from })
		}).then(instance => {
			return reseller.deployed.signup("Classpass", { from: classpass.from })
		}).then(() => {
			done()
		})
	})
	
	it("should update studio details", done => {
		studio.deployed.updateContactDetails(
			barrys.contactDetails, { from: barrys.from }
		).then(() => {
			return studio.deployed.getContactDetails.call(barrys.from)
		}).then(contactDetails => {
			assert.equal(contactDetails, barrys.contactDetails)
			done()
		})
	})

	it("should add, then remove a class", done => {
		studio.deployed.classCreate("Class name", "Class description", { from: barrys.from }).then(() => {
			return studio.deployed.classesCount.call({ from: barrys.from })
		}).then(count => {
			assert.equal(count, 1, "class count should == 1")
			return studio.deployed.classAtIndex.call(0, { from: barrys.from })
		}).then(address => {
			assert.notEqual(address, 0x0, "classAtIndex[0] should not be 0x0")
			done()
		})
	})
	
	it("should add, then remove a schedule", done => {
		studio.deployed.scheduleAdded(schedule, { from: barrys.from }).then(() => {
			return studio.deployed.schedulesCount.call()
		}).then(count => {
			assert.equal(count, 1, "schedules count should == 1")
			return studio.deployed.scheduleRemoved(schedule, { from: barrys.from })
		}).then(() => {
			return studio.deployed.schedulesCount.call({ from: barrys.from })
		}).then(count => {
			assert.equal(count, 0, "should have 0 classes after cancellation")
			done()
		})
	})

	it("should add, remove reseller", done => {
		studio.deployed.addReseller(
			classpass.from, {from: barrys.from}
		).then(() => {
			return studio.deployed.isAuthorizedReseller.call(barrys.from, classpass.from)
		}).then(isAuthorizedReseller => {
			assert.equal(isAuthorizedReseller, true, `${classpass.from} is not an authorized reseller (and should be)`)
			return reseller.deployed.getStudiosCount.call({ from: classpass.from })
		}).then(count => {
			assert.equal(count, 1)
			return reseller.deployed.getStudio.call(0, { from: classpass.from })
		}).then(address => {
			assert.equal(address, barrys.from);
			return reseller.deployed.getStudioState.call(0, { from: classpass.from })
		}).then(status => {
			assert.equal(status, 1)
			return studio.deployed.removeReseller(classpass.from, { from: barrys.from })
		}).then(() => {
			return studio.deployed.isAuthorizedReseller.call(barrys.from, classpass.from)
		}).then(isAuthorizedReseller => {
			assert.equal(isAuthorizedReseller, false, `${classpass.from} is an authorized reseller (and should not be)`)
			return reseller.deployed.getStudioState.call(0, { from: classpass.from })
		}).then(status => {
			assert.equal(status, 2)
			done()
		})
	})
})
