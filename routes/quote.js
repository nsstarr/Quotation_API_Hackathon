import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("you are at the quote router get");
});

router.post("/", async (req, res) => {
  // const {age, species, breed, address} = req.body;
  const {age} = req.body
  let price = 120;
  if (age < 6) {
    price = (((age * 5) + 100) / 100) * price
  }
  else if (age < 10) {
    price = ((((age % 5) * 10) + 125) / 100) * price 
  }
  else {
    price = price * 1.75
  }
  console.log(price)
})

export default router;
