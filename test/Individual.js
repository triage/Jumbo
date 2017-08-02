const Individual = artifacts.require("../contracts/Individual.sol")
const Authentication = artifacts.require("../contracts/Authentication.sol")
const eric = { name: "Eric Schulte", image: "https://scontent-mia3-2.xx.fbcdn.net/v/t31.0-8/20232740_10154649233791776_6846606338762033555_o.jpg?oh=56a9cff72d7c20bf5d7e7bb604ca0bf3&oe=59F240E6" }
const schedule = { address: 0x1e1A18dc1Ccaa2fA0268bf4da33656dC3c928574 }

contract("Individual", (accounts) => {
  eric.from = accounts[0]

	it("should create an individual and log in", done => {
    let individual
    Individual.deployed().then(instance => {
      individual = instance
      return individual.create(eric.name, eric.image, { from: eric.from })
    }).then(() => {
      return individual.getName.call(eric.from)
    }).then(name => {
      assert.equal(name, eric.name, "names must match")
      return individual.getImage.call(eric.from)
    }).then(image => {
      assert.equal(image, eric.image)
      return individual.addSchedule(schedule.address, { from: eric.from })
    }).then(() => {
      console.log('getting schedules...')
      return individual.getSchedules.call(eric.from)
    }).then(schedules => {
      assert.equal(schedules.length, 1, "schedules must reflect a new one added")
      assert.equal(schedules[0], schedule.address)
      return individual.removeSchedule(schedule.address, { from: eric.from })
    }).then(() => {
      return individual.getSchedules.call(eric.from)
    }).then(schedules => {
      assert.equal(schedules.length, 0)
      console.log('logging in with valid account')
      return individual.login.call({ from: eric.from })
    }).then(loggedIn => {
      assert.equal(loggedIn, true, "couldn't login")
      console.log('logging in with bad account...')
      return individual.login.call({ from: accounts[1] })
    }).then(loggedIn => {
      assert.equal(loggedIn, false, "logged in with bad account should be false")
      done()
    })
  })
})
