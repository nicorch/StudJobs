const listings = [
  {
    id: 1,
    title: "Baby-sitting",
    images: [{ fileName: "babysitting" }],
    price: 10,
    categoryId: 1,
    userId: 3,
    description: `Recherche baby-sitter à domicile à ST SEBASTIEN SUR LOIRE pour 5 heures de travail par semaine pour baby-sitter 1 enfant, 9 ans. Tâches confiées : garde d'enfants/baby-sitting, sortie d'école.`,
    type: "CDI",
    entreprise: "Mom&Pap",
    location: "Lormont"
  },
  {
    id: 2,
    title: "Inventaire H/F",
    images: [{ fileName: "inventaire" }],
    price: 8,
    categoryId: 2,
    userId: 2,
    description: `Chez nos clients, votre mission en tant qu'Inventoriste H/F sera de compter et de scanner à l'aide d'un lecteur de code-barres l'intégralité des articles présents en magasin.`,
    type: "CDD",
    entreprise: "Carrefour",
    location: "Bordeaux"
  },
  {
    id: 3,
    title: "Cours Math et Chimie",
    images: [{ fileName: "soutien_scolaire" }],
    price: 12,
    categoryId: 5,
    userId: 2,
    description: `Soutien scolaire en Portugais à domicile à PARIS pour un élève en classe de Adulte Niv. 2nde`,
    type: "Intérim",
    entreprise: "Asso Help Study",
    location: "Pessac"
  }
];

const addListing = (listing) => {
  listing.id = listings.length + 1;
  listings.push(listing);
};

const getListings = () => listings;

const getListing = (id) => listings.find((listing) => listing.id === id);

const filterListings = (predicate) => listings.filter(predicate);

module.exports = {
  addListing,
  getListings,
  getListing,
  filterListings,
};
