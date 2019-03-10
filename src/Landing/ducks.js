// use immuatbility-helper as much as possible here
// import { update } from 'immutability-helper';

const duckRoot = "Landing/";
export const ADD_COUNT = `${duckRoot}/ADD_COUNT`;
export const SHOW_COUNT = `${duckRoot}/SHOW_COUNT`;

const initialState = {
  title: 'LandingTitle',
  count: 0,
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'SHOW_COUNT':
      return state.count;

    case ADD_COUNT: {
      return {
        ...state,
        count: state.count + 1,
      }
    }


    default:
      return state;
  }
}

export const showCount = () => ({
  type: SHOW_COUNT
});

export const addCount = () => ({
  type: ADD_COUNT
});
