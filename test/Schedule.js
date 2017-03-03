let barrys = {
	contactDetails: "135 W 20th St, New York, NY 10011"
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

let classpass = {}
let jessprager = {}

contract("Schedule", (accounts) => {
	barrys.from = accounts[0]
	classpass.from = accounts[1]
	jessprager.from = accounts[2]

	beforeEach((done) => {
	    Reseller.new(
	    	"Classpass", { from: classpass.from }
	    ).then(
	    	(reseller) => {
	    		classpass.instance = reseller
	    		return Individual.new("Jess Prager", {from: jessprager.from})
	    	}
	    ).then(
	    	(individual) => {
	    		jessprager.instance = individual
	    		return Studio.new("Barry's", { from: barrys.from })
	    	}
	    ).then(
	    	(studio) => {
	    		barrys.instance = studio
	    		return barrys.instance.addReseller(
	    			classpass.instance.address,
	    			{ from: barrys.from }
	    		)
	    	}
	    ).then(
	    	() => {
	    		return Class.new(
	    			barrys.instance.address,
	    			legsAss.name,
	    			legsAss.description,
	    			{ from: barrys.from }
	    		)
	    	}
	    ).then(
	    	(classInstance) => {
	    		legsAss.instance = classInstance;

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
	    	}
	    ).then(
	    	(schedule) => {
	    		legsAss12pm.instance = schedule
	    		// schedule.SpotPurchased().watch((error, response) => {
	    		// 	console.log("SPOT PURCHASED!")
	    		// 	console.log(response)	
	    		// })
	    		done()
	    	}
	    )
	})

	it("should get correct reseller price, buy a spot, request a refund", (done) => {
		legsAss12pm.instance.getPrice.call(
			{ from: classpass.from }
		).then(
			(price) => {
				assert.equal(price.valueOf(), legsAss12pm.price.reseller)
				return legsAss12pm.instance.spotPurchase(
					jessprager.instance.address,
					{ from: classpass.from, value: price }
				)
			}
		).then(
			() => {
				return legsAss12pm.instance.spotIsReserved.call(
					jessprager.instance.address, { from: classpass.from }
				)
			}

		).then(
			(found) => {
				assert.isTrue(found)
				return legsAss12pm.instance.spotCancel(
					jessprager.instance.address,
					{ from: classpass.from }
				)
			}
		).then(
			() => {
				return legsAss12pm.instance.spotIsReserved.call(
					jessprager.instance.address, { from: classpass.from }
				)
			}
		).then(
			(found) => {
				assert.isFalse(found)
				done()
			}
		)
	})

	it("should get correct individual price, buy a spot, request a refund", (done) => {
		legsAss12pm.instance.getPrice.call(
			{ from: jessprager.from }
		).then(
			(price) => {
				assert.equal(price.valueOf(), legsAss12pm.price.individual)
				return legsAss12pm.instance.spotPurchase(
					jessprager.instance.address,
					{ from: jessprager.from, value: price }
				)
			}
		).then(
			() => {
				return legsAss12pm.instance.spotIsReserved.call(
					jessprager.instance.address,
					{ from: jessprager.from })
			}

		).then(
			(found) => {
				assert.isTrue(found)
				return legsAss12pm.instance.spotCancel(
					jessprager.instance.address,
					{ from: jessprager.from }
				)
			}
		).then(
			() => {
				return legsAss12pm.instance.spotIsReserved.call(
					jessprager.instance.address, { from: jessprager.from }
				)
			}
		).then(
			(found) => {
				assert.isFalse(found)
				done()
			}
		)
	})


	it("should cancel a class, refund all tickets", (done) => {
		legsAss12pm.instance.spotPurchase(
			jessprager.instance.address,
			{
				from: jessprager.from,
				value: legsAss12pm.price.individual
			}
		).then(
			() => {
				return legsAss12pm.instance.spotPurchase(
					jessprager.instance.address,
					{
						from: classpass.from,
						value: legsAss12pm.price.reseller
					}
				)
			}
		).then(
			() => {
				return legsAss12pm.instance.cancel(
					"instructor unable to attend",
					{
						from: classpass.from
					}
				)
			}
		).then(
			() => {
				done()
			}
		)
	})
})
