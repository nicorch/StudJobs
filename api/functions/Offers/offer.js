const admin = require("firebase-admin");
const functions = require("firebase-functions");

const getOffer = (response, offerId) => {
    const offersCollection = admin.firestore().collection("offers");
    offersCollection
        .doc(offerId)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                response.status(404).send("Not found");
            } else {
                response.send(Object.assign({}, {
                    id: doc.id
                }, doc.data()));
            }
        });
};

const createOffer = (response, offerId, body) => {
    const offersCollection = admin.firestore().collection("offers");
    offersCollection
        .doc(offerId)
        .set(body)
        .then(() =>
            response.send(Object.assign({}, {
                id: offerId
            }, body))
        )
        .catch((err) => {
            functions.logger.error("Create Offer failed!", {
                error: err
            });
            response.status(500).send(err);
        });
};

const updateOffer = (response, offerId, body) => {
    const offersCollection = admin.firestore().collection("offers");
    offersCollection
        .doc(offerId)
        .set(body, {
            merge: true
        })
        .then(() => {
            offersCollection
                .doc(offerId)
                .get()
                .then((doc) => {
                    if (!doc.exists) {
                        response.status(404).send("Not found");
                    } else {
                        response.send(Object.assign({}, {
                            id: doc.id
                        }, doc.data()));
                    }
                });
        })
        .catch((err) => {
            functions.logger.error("Update Offer failed!", {
                error: err
            });
            response.status(500).send(err);
        });
};

const deleteOffer = (response, offerId) => {
    const offersCollection = admin.firestore().collection("offers");

    offersCollection
        .doc(offerId)
        .delete()
        .then(() => response.send("Deleted"))
        .catch((err) => {
            functions.logger.error("Delete Offer failed!", {
                error: err
            });
            response.status(500).send(err);
        });
};

const handleOfferRequest = (request, response) => {
    const offerId = request.query.offerId;
    const body = request.body;
    if (!offerId) response.status(400).send("Not allowed");
    else {
        switch (request.method) {
            case "GET":
                // Send back the offer
                getOffer(response, offerId);
                break;
            case "POST":
                // Create the offer
                createOffer(response, offerId, body);
                break;
            case "PATCH":
                // Update the offer
                updateOffer(response, offerId, body);
                break;
            case "DELETE":
                // Delete the offer
                deleteOffer(response, offerId);
                break;
            default:
                response.status(400).send("Not allowed");
                break;
        }
    }
};

module.exports = handleOfferRequest;