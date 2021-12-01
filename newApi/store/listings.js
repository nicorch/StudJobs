const listings = [
  {
    id: 1,
    title: "Offre 1",
    images: [{ fileName: "shoes1" }],
    price: 10,
    categoryId: 1,
    userId: 1,
    description: "Description Offre 1",
    type: "CDI",
    entreprise: "Carrefour",
    location: "Lormont"
  },
  {
    id: 2,
    title: "Offre 2",
    images: [{ fileName: "couch1" }],
    price: 8,
    categoryId: 2,
    userId: 2,
    description: "Description Offre 2",
    type: "CDD",
    entreprise: "Mom&Pap",
    location: "Bordeaux"
  },
  {
    id: 3,
    title: "Offre 3",
    images: [{ fileName: "jacket1" }],
    price: 12,
    categoryId: 5,
    userId: 2,
    description: "Description Offre 3",
    type: "Intérim",
    entreprise: "Books&Coffee",
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
