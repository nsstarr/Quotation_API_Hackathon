import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("you are at the quote router get");
});

export default router;
