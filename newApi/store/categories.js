const categories = [
  {
    id: 1,
    name: "Baby-sitter",
    icon: "mother-nurse",
    backgroundColor: "#fc5c65",
    color: "white"
  },
  {
    id: 2,
    name: "Serveur / Serveuse",
    icon: "bottle-wine",
    backgroundColor: "#fd9644",
    color: "white"
  },
  {
    id: 3,
    name: "Soutien scolaire",
    icon: "school",
    backgroundColor: "#fed330",
    color: "white"
  },
  {
    id: 4,
    name: "Livreur",
    icon: "moped",
    backgroundColor: "#26de81",
    color: "white"
  },
  {
    id: 5,
    name: "Hôte(sse) d'accueil",
    icon: "human-greeting",
    backgroundColor: "#2bcbba",
    color: "white"
  },
  {
    id: 6,
    name: "Enquêteur",
    icon: "account-search",
    backgroundColor: "#45aaf2",
    color: "white"
  },
  {
    id: 7,
    name: "Distributeur",
    icon: "newspaper-variant-multiple",
    backgroundColor: "#4b7bec",
    color: "white"
  },
  {
    id: 8,
    name: "Vendeur",
    icon: "account-tie-voice",
    backgroundColor: "#a55eea",
    color: "white"
  },
  {
    id: 9,
    name: "Restauration",
    icon: "food",
    backgroundColor: "#a55eea",
    color: "white"
  },
  {
    id: 10,
    name: "Polyvalent",
    icon: "account-multiple",
    backgroundColor: "#a55eea",
    color: "white"
  },
  {
    id: 11,
    name: "Autre",
    icon: "dots-horizontal",
    backgroundColor: "#778ca3",
    color: "white"
  }
];

const getCategories = () => categories;

const getCategory = id => categories.find(c => c.id === id);

module.exports = {
  getCategories,
  getCategory
};
