let barrys = { contactDetails: "135 W 20th St, New York, NY 10011" }
let classpass = {}
let barrysClass = {}

const Reseller = artifacts.require("./Reseller.sol")
const Studio = artifacts.require("./Studio.sol")
const Class = artifacts.require("./Class.sol")
const schedule = 0x123

contract("Studio", (accounts) => {
	barrys.from = accounts[0]
	classpass.from = accounts[1]

	beforeEach(done => {
		Studio.new("Barry's", { from: barrys.from}).then((instance) => {
			barrys.instance = instance
			return Reseller.new("Classpass", { from: classpass.from})
		}).then((instance) => {
			classpass.instance = instance
			done()
		})
	})
	
	it("should update studio details", done => {
		barrys.instance.updateContactDetails(
			barrys.contactDetails, {from: barrys.from}
		).then(() => {
				return barrys.instance.contactDetails.call()
		}).then((contactDetails) => {
				assert.equal(contactDetails, barrys.contactDetails, `'${contactDetails}' not equal to '${barrys.contactDetails}'`)
				done()
		})
	})

	it("should add, then remove a class", done => {
		Class.new(barrys.instance.address, "Class name", "Class description", { from: barrys.from }).then((classInstance) => {
			barrysClass = classInstance
			return barrys.instance.classAdded(barrysClass.address)
		}).then(() => {
			return barrys.instance.classesCount.call()
		}).then((count) => {
			assert.equal(count, 1, "class count should == 1")
			return barrys.instance.classAtIndex.call(0)
		}).then((address) => {
			assert.equal(address, barrysClass.address, "classAtIndex[0] should == barrysClass.address")
			done()
		})
	})

	it("should add, then remove a schedule", done => {
		barrys.instance.scheduleAdded(schedule, {from: barrys.from}).then(() => {
			return barrys.instance.schedulesCount.call()
		}).then((count) => {
			assert.equal(count, 1, "schedules count should == 1")
			return barrys.instance.scheduleRemoved(schedule)
		}).then(() => {
			return barrys.instance.schedulesCount.call()
		}).then((count) => {
			assert.equal(count, 0, "should have 0 classes after cancellation")
			done()
		})
	})

	it("should add, remove reseller", done => {
		barrys.instance.addReseller(
			classpass.instance.address, {from: barrys.from}
		).then(
			() => {
				return barrys.instance.isAuthorizedReseller.call(classpass.instance.address)
			}
		).then(
			(isAuthorizedReseller) => {
				assert.equal(isAuthorizedReseller, true, `${classpass.instance.address} is not an authorized reseller (and should be)`)
				return barrys.instance.isSenderAuthorizedReseller.call(classpass.from)
			}
		).then(
			(isSenderAuthorizedReseller) => {
				assert.equal(isSenderAuthorizedReseller, true, `${classpass.from} is not an authorized reseller (and should be)`)
				return barrys.instance.removeReseller(classpass.instance.address, { from: barrys.from })
			}
		).then(
			() => {
				return barrys.instance.isAuthorizedReseller.call(classpass.instance.address)
			}
		).then(
			(isAuthorizedReseller) => {
				assert.equal(isAuthorizedReseller, false, `${classpass.instance.address} is an authorized reseller (and should not be)`)
				return barrys.instance.isSenderAuthorizedReseller.call(classpass.from)
			}
		).then(
			(isSenderAuthorizedReseller) => {
				assert.equal(isSenderAuthorizedReseller, false, `${classpass.from} is an authorized reseller (and should not be)`)
				done()
			}
		)
	})
})