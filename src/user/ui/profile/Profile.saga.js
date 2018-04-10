import { USER_UPDATE, userUpdated } from './ProfileActions';
import { put, select, apply, takeEvery } from 'redux-saga/effects';
import UserType from 'user/model/UserType';
import eth from 'util/eth';

function* doUserUpdate(action) {
  const { name, contactDetails } = action;

  try {
    let contract;
    const type = yield select(state => state.user.data.type);
    switch (type) {
      case UserType.studio:
        contract = eth.Studio();
        break;
      case UserType.reseller:
        contract = eth.Reseller();
        break;
      case UserType.individual:
        contract = eth.Individual();
        break;
      default:
        break;
    }
    const entity = yield contract.deployed();
    yield apply(entity, entity.updateContactDetails.sendTransaction, [contactDetails, eth.from()]);
    yield put(userUpdated(name, contactDetails));
  } catch (error) {
    console.log(`error:${error}`);
  }
}


export function* watchUserUpdate() {
  yield takeEvery(USER_UPDATE, doUserUpdate);
}
