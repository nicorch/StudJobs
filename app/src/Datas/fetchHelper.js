


import  {REACT_APP_FIREBASE_BASEURL,REACT_APP_FIREBASE_BASEURL_DEV} from '@env'
const baseURL = REACT_APP_FIREBASE_BASEURL;

const fetchHelper = {
  getOffers: async (filters) =>
    fetch(
      REACT_APP_FIREBASE_BASEURL +"/offers",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ filters: filters }),
      }
    ).then((response) => { 
      console.log('res',filters);
      return response.json()})
    .catch(err => console.log('err',err,REACT_APP_FIREBASE_BASEURL_DEV,'or',REACT_APP_FIREBASE_BASEURL)),
  getOffer: async (offerId) =>

    fetch(
      baseURL +`/offers?offerId=${offerId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => response.json()),
  createOffer: async (offer) =>
    fetch(
      baseURL +`/offer?offerId=${offer.id}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ ...offer }),
      }
    ).then((response) => response.json()),
  updateCompletedForOffer: async (offerId, newCompleted) =>
    fetch(
      baseURL +`/offer?offerId=${offerId}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({ completed: newCompleted }),
      }
    ).then((response) => response.json())
};

export default fetchHelper;
