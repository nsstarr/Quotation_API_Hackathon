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
  const prices = [];
  let totalPrice = 0;
  req.body.map((pet) => {
    let price = 120;
    const { age, breed, region } = pet;

    price = ageMultiplier(price, age);
    price = breedDiscount(price, breed);
    price = regionMultiplier(price, region);

    prices.push(Math.round(price * 100) / 100);
  });

  // let x;
  // if (prices.length > 1) {
  //   x = prices.map((price) => {
  //     console.log(price);
  //     price * 0.9;
  //   });
  // }
  // console.log(x);

  prices.forEach((price) => {
    totalPrice += price;
  });

  if (prices.length > 1) {
    totalPrice = totalPrice * 0.9;
  }

  console.log(totalPrice);
  res.json({ price: prices, totalPrice: Math.round(totalPrice * 100) / 100 });
});

export default router;
