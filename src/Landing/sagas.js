// import { takeEvery, put, call, all } from 'redux-saga/effects';

import { takeEvery } from 'redux-saga/effects';

// import { GetRequest } from "../api.js";

import { SHOW_COUNT } from './ducks.js';

// export function* makeApiCallAsync() {
//    try {
//       const fileNames = yield Gallery();
//       if (fileNames.data.length !== 0) {
//         yield fileNames.data.map(file => call(getPhotoForDownloadAsync, file))
//       }
//       yield;
//    } catch (e) {
//       console.log("failure on getPhotosAsync", e);
//    }
// }

export function* makeApiCallAsync() {
  try {
    yield console.log("api call success");
  } catch (e) {
    console.log("api call failure");
  }
}

export const watchers = [
  function* watchApiCall() {
    // yield takeEvery(API_CALL, makeApiCallAsync);
    yield takeEvery(SHOW_COUNT, makeApiCallAsync);
  },
]

export default watchers;
