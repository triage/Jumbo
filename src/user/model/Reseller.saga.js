import { put, takeEvery } from 'redux-saga/effects'
import eth from 'src/util/eth'
import { RESELLER_LOAD, resellerLoaded } from './ResellerActions'

function* doResellerLoad(action) {
  const Reseller = eth.Reseller()
  const Studio = eth.Studio()
  const from = eth.from()
  debugger
  try {
    const reseller = yield Reseller.deployed()
    const studio = yield Studio.deployed()
    let count = yield reseller.getStudiosCount.call(from)
    const studios = []
    debugger
    for (let i = 0; i < parseInt(count.valueOf(10), 10); i++) {
      const address = yield reseller.getStudio.call(i, from)
      const name = studio.getName.call(address, from)
      debugger
      studios.push({
        address,
        name
      })
    }
    yield put(resellerLoaded(studios))

  } catch (error) {
    console.log(`error:${error}`)
    debugger
  }
}

export function* watchResellerLoad() {
  yield takeEvery(RESELLER_LOAD, doResellerLoad)
}
