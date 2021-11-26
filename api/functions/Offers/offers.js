const functions = require("firebase-functions");
const admin = require('firebase-admin');

const utc = 1; //handle utc + 1;

const getHours = (date) => new Date(date).getHours() + utc;

const getOffers = (request, response) => {
    admin.firestore().collection("offers").get().then((snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
            var isRespect = true
            var currentDoc = doc.data();
            if (request.body && request.body.filters) {
                let filters = request.body.filters;
                for (const key in filters) {
                    const element = filters[key];
                    switch (key) {
                        case 'location': // Array
                            isRespect = (element['city'].indexOf(currentDoc[key]['city']) != -1) ? isRespect : false;
                            break;
                        case 'search': // String
                            isRespect = element ? (currentDoc['title'].toLowerCase().includes(element.toLowerCase()) || currentDoc['description'].toLowerCase().includes(element.toLowerCase()) || currentDoc['entreprise']['name'].toLowerCase().includes(element.toLowerCase())) ? isRespect : false : isRespect;
                            break;
                        case 'typeOffre': // Array
                            var hasType = [];
                            for (const val in element) {
                                if (element[val] == true && currentDoc['type'] == val) {
                                    hasType.push(val);
                                }
                            }
                            isRespect = (hasType.length) ? isRespect : false;
                            break;
                        case 'date': // Array
                            var dateDebut = currentDoc['dateDebut'] && new Date(currentDoc['dateDebut'].toDate());
                            var dateFin = currentDoc['dateFin'] && new Date(currentDoc['dateFin'].toDate());
                            if (element.debut) isRespect = (dateDebut && dateDebut.getTime() >= new Date(element.debut).getTime()) ? isRespect : false;
                            if (element.fin) isRespect = (dateFin && dateFin.getTime() <= new Date(element.fin).getTime()) ? isRespect : false;
                            break;
                        default:
                            break;
                    }
                    if (key == 'horaires') {
                        for (const val in filters['horaires']) {
                            const element = filters['horaires'][val];
                            const dateCurrent = new Date(element).getHours();
                            switch (val) {
                                case 'dmax':
                                    var dateDoc = currentDoc['heureDebut'] && getHours(currentDoc['heureDebut'].toDate());
                                    isRespect = (dateDoc && dateDoc <= dateCurrent) ? isRespect : false;
                                    break;
                                case 'fmax':
                                    var dateDoc = currentDoc['heureFin'] && getHours(currentDoc['heureFin'].toDate());
                                    isRespect = (dateDoc <= dateCurrent) ? isRespect : false;
                                    break;
                                case 'dmin':
                                    var dateDoc = currentDoc['heureDebut'] && getHours(currentDoc['heureDebut'].toDate());
                                    isRespect = (dateDoc && (dateDoc >= dateCurrent)) ? isRespect : false;
                                    break;
                                case 'fmin':
                                    var dateDoc = currentDoc['heureFin'] && getHours(currentDoc['heureFin'].toDate());
                                    isRespect = (dateDoc && (dateDoc >= dateCurrent)) ? isRespect : false;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
            if (isRespect) result.push(Object.assign({}, {
                id: doc.id
            }, doc.data()))
        });
        response.send(result);
    });
}

module.exports = getOffers;