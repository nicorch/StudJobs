const functions = require("firebase-functions");
const admin = require("firebase-admin");
const getOffers = require('./Offers/offers.js');
const handleOfferRequest = require("./Offers/offer.js");
// const handleUserRequest = require("./user.js");


admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.offers = functions.region("europe-west1").https.onRequest(getOffers)

exports.offer = functions
  .region("europe-west1")
  .https.onRequest(handleOfferRequest);