const express = require("express");
const router = express.Router();

const usersStore = require("../store/users");
const listingsStore = require("../store/listings");
const auth = require("../middleware/auth");

router.get("/:id", auth, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = usersStore.getUserById(userId);
  if (!user) return res.status(404).send();

  const listings = listingsStore.filterListings(
    listing => listing.userId === userId
  );

  res.send({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    town: user.town,
    address: user.address,
    type: user.type,
    age: user.age,
    phone: user.phone,
    companyName: user.companyName,
    disponibility: user.disponibility,
    permis: user.permis,
    listings: listings.length
  });
});

module.exports = router;
