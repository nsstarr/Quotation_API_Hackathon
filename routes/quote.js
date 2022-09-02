import express from "express";

const router = express.Router();

function ageMultiplier(price, age) {
  if (age < 6) {
    price = ((age * 5 + 100) / 100) * price;
  } else if (age < 10) {
    price = (((age % 5) * 10 + 125) / 100) * price;
  } else {
    price = price * 1.75;
  }
  return price;
}

function breedDiscount(price, breed) {
  if (
    breed === "Jack Russell" ||
    breed === "Chihuahua" ||
    breed === "Yorkshire Terrier"
  ) {
    price = price * 0.9;
  }
  return price;
}

function regionMultiplier(price, region) {
  if (region === "London" || region === "SouthEast" || region === "East") {
    price = price * 1.15;
  }
  return price;
}

router.get("/", async (req, res) => {
  res.send("you are at the quote router get");
});

router.post("/", async (req, res) => {
  // const {age, species, breed, address} = req.body;
  const petNumber = req.body.length;
  const payload = {};
  const { age, breed, region } = req.body[0];
  let price = 120;
  price = ageMultiplier(price, age);
  price = breedDiscount(price, breed);
  price = regionMultiplier(price, region);

  res.json({ price: Math.round(price * 100) / 100 });
});

export default router;
