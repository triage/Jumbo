let barrys = { contactDetails: "135 W 20th St, New York, NY 10011" }
let classpass = {}

const Reseller = artifacts.require("./Reseller.sol")
const Studio = artifacts.require("./Studio.sol")

contract("Studio", (accounts) => {
	barrys.from = accounts[0]
	classpass.from = accounts[1]

	beforeEach((done) => {
		barrys.instance = Studio.deployed()
	    Reseller.new(
	    	"Classpass", { from: classpass.from }
	    ).then(
	    	(reseller) => {
	    		classpass.instance = reseller
	    		done()
	    	}
	    )
	})

	/*
	it("should update studio details", (done) => {
		console.log('xxxxxx')
		console.log(barrys.instance)
		barrys.instance.updateContactDetails(
			barrys.contactDetails, {from: barrys.from}
		).then(
			() => {
				return barrys.instance.contactDetails.call()
			}
		).then(
			(contactDetails) => {
				assert.equal(contactDetails, barrys.contactDetails, `'${contactDetails}' not equal to '${barrys.contactDetails}'`)
				done()
			}
		)
	})

	it("should add, remove reseller", (done) => {
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
	})*/
})