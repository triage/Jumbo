const Class = artifacts.require("./Class.sol")
const Studio = artifacts.require("./Studio.sol")
const Reseller = artifacts.require("./Reseller.sol")
const Schedule = artifacts.require("./Schedule.sol")
const Individual = artifacts.require("./Individual.sol")
const Authentication = artifacts.require("./Authentication.sol")

let barrys = {
	name: "Barry's - Chelsea",
	contactDetails: "135 W 20th St, New York, NY 10011"
}

let classpass = {
	name: "Classpass"
}
let jessprager = {
	name: "Jess Prager"
}

let legsAss = {
	name: "Legs & Ass",
	description: "Squats, squats, squats and more squats."
}
let legsAss12pm = {
	instructor: "Noah",
	price: {
		reseller: 20,
		individual: 35
	},
	date: {
		start: new Date("2017-01-01T12:00:00").getTime(),
		end: new Date("2017-01-01T13:00:00").getTime()
	},
	spots: {
		total: 20,
		reseller: 5
	}
}


let reseller = {}
let individual = {}
let studio = {}
let authentication = {}

contract("Schedule", (accounts) => {
	barrys.from = accounts[1]
	classpass.from = accounts[2]
	jessprager.from = accounts[3]

	before(done => {
		Reseller.deployed().then(deployed => {
			reseller.deployed = deployed
			return Individual.deployed()
		}).then(deployed => {
			individual.deployed = deployed
			return Studio.deployed()
		}).then(deployed => {
			studio.deployed = deployed
			return Authentication.deployed()
		}).then(deployed => {
			authentication.deployed = deployed
			return reseller.deployed.setAuthentication(authentication.deployed.address)
		}).then(() => {
			return reseller.deployed.authentication.call()
		}).then(resellerAuthentication => {
			assert.equal(resellerAuthentication, authentication.deployed.address, "reseller authetication not correctly set")
			return individual.deployed.setAuthentication(authentication.deployed.address)
		}).then(() => {
			return individual.deployed.authentication.call()
		}).then(individualAuthentication => {
			assert.equal(individualAuthentication, authentication.deployed.address, "individual authetication not correctly set")
			return studio.deployed.setAuthentication(authentication.deployed.address)
		}).then(() => {
			return studio.deployed.authentication.call()
		}).then(studioAuthentication => {
			assert.equal(studioAuthentication, authentication.deployed.address, "studio authetication not correctly set")
			return reseller.deployed.signup(
				"Classpass", { from: classpass.from }
			)
		}).then(() => {
			return reseller.deployed.getName.call(classpass.from)
		}).then(name => {
			assert.equal(classpass.name, name, "reseller name not correctly set");
			return individual.deployed.signup(jessprager.name, { from: jessprager.from })
		}).then(() => {
			return individual.deployed.getName.call(jessprager.from)
		}).then(name => {
			assert.equal(jessprager.name, name, "individual name not correctly set");
			return studio.deployed.signup(barrys.name, { from: barrys.from })
		}).then(() => {
			return studio.deployed.getName.call(barrys.from)
		}).then(name => {
			assert.equal(barrys.name, name, "studio name not correctly set");
			return studio.deployed.addReseller(
				classpass.from,
				{ from: barrys.from }
			)
	    }).then(() => {
			return studio.deployed.isAuthorizedReseller.call(barrys.from, classpass.from)
		}).then(isAuthorized => {
			assert.equal(isAuthorized, true)
			return studio.deployed.isAuthorizedReseller.call(barrys.from, jessprager.from)
		}).then(isAuthorized => {
			assert.equal(isAuthorized, false)
			return studio.deployed.classCreate(
				legsAss.name,
				legsAss.description,
				{ from: barrys.from }
			)
		}).then(() => {
			return studio.deployed.classesCount({ from: barrys.from })
		}).then(count => {
			return studio.deployed.classAtIndex(count - 1, { from: barrys.from })
		}).then(address => {
			legsAss.instance = Class.at(address);
			console.log(`class at:${address}`)
			return legsAss.instance.name()
		}).then(name => {
			assert.equal(name, legsAss.name);
			return legsAss.instance.owner();
		}).then(owner => {
			assert.equal(owner, barrys.from)
			done()
			return Schedule.new(
				legsAss.instance.address, //address _class,
				legsAss12pm.instructor, //string _instructor
				legsAss12pm.date.start, //uint _dateStart
				legsAss12pm.date.end, //uint _dateEnd,
				legsAss12pm.spots.total, //uint nSpots,
				legsAss12pm.spots.reseller, //uint _nSpotsReseller
				legsAss12pm.price.individual, //uint priceIndividual
				legsAss12pm.price.reseller, //uint priceReseller
				{ from: barrys.from }
			)
	    }).then(schedule => {
			legsAss12pm.instance = schedule
			return legsAss12pm.instance.spotTypeWithSender.call(jessprager.from)
		}).then(type => {
			assert.equal(type.valueOf(), 1)
			return legsAss12pm.instance.spotTypeWithSender.call(classpass.from)
		}).then(type => {
			assert.equal(type.valueOf(), 2)
			done()
	    })
	})

	it.only("foo", done => {
		done()
	})

	it("should get the correct prices", done => {
		legsAss12pm.instance.getPriceWithUserType.call(
			"INDIVIDUAL", { from: barrys.from }
		).then(price => {
			assert.equal(price, legsAss12pm.price.individual)
			return legsAss12pm.instance.getPriceWithUserType.call("RESELLER", { from: barrys.from })
		}).then(price => {
			assert.equal(price, legsAss12pm.price.reseller)
			done()
		})
	})
	
	it("should get correct reseller price, buy a spot, request a refund", done => {
		legsAss12pm.instance.getPrice.call(
			{ from: classpass.from }
		).then(price => {
			assert.equal(price.valueOf(), legsAss12pm.price.reseller)
			return reseller.deployed.spotPurchase(
				legsAss12pm.instance.address,
				jessprager.from,
				{ from: classpass.from, value: price }
			)
		}).then(() => {
			return legsAss12pm.instance.spotIsReserved.call(
				jessprager.from, { from: classpass.from }
			)
		}).then(found => {
			assert.isTrue(found)
			return reseller.deployed.spotCancel(
				legsAss12pm.instance.address,
				jessprager.from,
				{ from: classpass.from }
			)
		}).then(() => {
			return legsAss12pm.instance.spotIsReserved.call(
				jessprager.from, { from: classpass.from }
			)
		}).then(found => {
			assert.isFalse(found)
			done()
		})
	})
	
	it("should get correct individual price, buy a spot, request a refund", done => {
		legsAss12pm.instance.getPrice.call(
			{ from: jessprager.from }
		).then(price => {
			assert.equal(price.valueOf(), legsAss12pm.price.individual)
			return individual.deployed.spotPurchase(
				legsAss12pm.instance.address,
				{ from: jessprager.from, value: price }
			)
		}).then(() => {
			return individual.deployed.getSchedulesCount.call({ from: jessprager.from })
		}).then(count => {
			return individual.deployed.getSchedule.call(0, { from: jessprager.from })
		}).then(address => {
			assert.equal(address, legsAss12pm.instance.address)
			return legsAss12pm.instance.spotIsReserved.call(
				jessprager.from)
		}).then(found => {
			assert.isTrue(found)
			return individual.deployed.spotCancel(
				legsAss12pm.instance.address,
				{ from: jessprager.from }
			)
		}).then(() => {
			return legsAss12pm.instance.spotIsReserved.call(
				jessprager.from,
				{ from: jessprager.from }
			)
		}).then(found => {
			assert.isFalse(found)
			done()
		})
	})
	
	it("should complete a class", done => {
		legsAss12pm.instance.complete.call(
			{ from: barrys.from}
		).then(() => {
			done()
		})
	})

	it("owner should cancel a class, refund all tickets", done => {
		individual.deployed.spotPurchase(
			legsAss12pm.instance.address,
			{
				from: jessprager.from,
				value: legsAss12pm.price.individual
		}).then(() => {
			return legsAss12pm.instance.cancel(
				"instructor unable to attend",
				{
					from: barrys.from
				}
			)
		}).then(() => {
			done()
		})
	})
})
