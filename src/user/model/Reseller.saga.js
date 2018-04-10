import { put, takeEvery } from 'redux-saga/effects';
import eth from 'util/eth';
import { RESELLER_LOAD, resellerLoaded } from './ResellerActions';

function* doResellerLoad(action) {
  const Reseller = eth.Reseller();
  const Studio = eth.Studio();
  const from = eth.from();
  try {
    const reseller = yield Reseller.deployed();
    const studio = yield Studio.deployed();
    const count = yield reseller.getStudiosCount.call(from);
    const studios = [];
    for (let i = 0; i < parseInt(count.valueOf(10), 10); i++) {
      const address = yield reseller.getStudio.call(i, from);
      const state = yield reseller.getStudioState.call(i, from);
      const name = yield studio.getName.call(address, from);

      studios.push({
        address,
        name,
        state,
      });
    }
    yield put(resellerLoaded(studios));
  } catch (error) {
    console.log(`error:${error}`);
  }
}

export function* watchResellerLoad() {
  yield takeEvery(RESELLER_LOAD, doResellerLoad);
}
