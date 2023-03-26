import axios from 'axios';

import * as Types from './types';

export const searchResultAction = (searchterm) => (dispatch) => {
  axios.get(`api/search/term/${searchterm}`).then((response) => {
    dispatch({
      type: Types.Searching,
      payload: {
        queryterm: response.data.searchterm,
        searchdata: response.data.transactions,
        totalTransaction: response.data.totalTransaction
      }
    })
  }).catch((err) => {
    console.log(err);
  })
}