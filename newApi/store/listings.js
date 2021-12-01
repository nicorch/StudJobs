const listings = [
  {
    id: 1,
    title: "Baby-sitting",
    images: [{ fileName: "babysitting" }],
    price: 10,
    categoryId: 1,
    userId: 1,
    description: "Description Offre 1",
    type: "CDI",
    entreprise: "Mom&Pap",
    location: "Lormont"
  },
  {
    id: 2,
    title: "Offre 2",
    images: [{ fileName: "inventaire" }],
    price: 8,
    categoryId: 2,
    userId: 2,
    description: "Description Offre 2",
    type: "CDD",
    entreprise: "Carrefour",
    location: "Bordeaux"
  },
  {
    id: 3,
    title: "Offre 3",
    images: [{ fileName: "soutien_scolaire" }],
    price: 12,
    categoryId: 5,
    userId: 2,
    description: "Description Offre 3",
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
