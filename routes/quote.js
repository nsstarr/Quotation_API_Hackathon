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
  let postcode = req.body.postcode;
  async function checkPostCode(postcode) {
    console.log("hello there");

    const response = await fetch(
      `https://remote.address44.com/v2/exapi/?access-key=1WN5WP19UUKN5SDRGJ_196_133_5VTO31CUO_AJMYDIQLMEGY66&postcode=${postcode}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.json();
  }
  let data = await checkPostCode(postcode);
  console.log(data);

  if (data) {
    console.log("Address is valid");
  } else {
    console.log("Address is invalid");
  }

  const petNumber = req.body.length;
  const payload = {};
  const prices = {};

  let totalPrice = 0;
  req.body.map((pet) => {
    let price = 120;
    const { age, breed, region, name } = pet;

    price = ageMultiplier(price, age);
    price = breedDiscount(price, breed);
    price = regionMultiplier(price, region);

    // prices.push(Math.round(price * 100) / 100);
    prices[name] = Math.round(price * 100) / 100;
  });

  // let x;
  // if (prices.length > 1) {
  //   x = prices.map((price) => {
  //     console.log(price);
  //     price * 0.9;
  //   });
  // }
  // console.log(x);

  // prices.forEach((price) => {
  //   totalPrice += price;
  // });

  Object.values(prices).forEach((price) => {
    totalPrice += price;
  });

  if (prices.length > 1) {
    totalPrice = totalPrice * 0.9;
  }

  console.log(totalPrice);
  res.json({ price: prices, totalPrice: Math.round(totalPrice * 100) / 100 });
});

export default router;
