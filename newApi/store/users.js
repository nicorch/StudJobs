const users = [
  {
    id: 1,
    firstName: "Mohamed",
    lastName: "Lotf",
    email: "med@lotf.com",
    password: "123456",
    town: "Floirac",
    address: "4 Goya",
    type: "étudiant",
    age: 23,
    phone: 0766554765,
    companyName: null,
    disponibility: true,
    permis: false,
  },
  {
    id: 2,
    firstName: "Simo",
    lastName: "Cobban",
    email: "simo@tf.com",
    password: "123456",
    town: "Lormont",
    address: "",
    type: "professionel",
    age: null,
    phone: null,
    companyName: "Catie",
    disponibility: null,
    permis: null,
  },
  {
    id: 3,
    firstName: "Marc",
    lastName: "Lyer",
    email: "Marc@lyer.com",
    password: "123456",
    town: "Talence",
    address: "",
    type: "professionel",
    age: null,
    phone: null,
    companyName: "Jobs4u",
    disponibility: null,
    permis: null,
  }
];

const getUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id);

const getUserByEmail = (email) => users.find((user) => user.email === email);

const addUser = (user) => {
  user.id = users.length + 1;
  users.push(user);
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  addUser,
};
