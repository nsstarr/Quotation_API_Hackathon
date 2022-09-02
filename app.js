import express from "express";
import quoteRouter from "./routes/quote.js";

const app = express();
const PORT = process.env.PORT || 3000;

// So that we can understand any jsons that are returned
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

app.use("/quote", quoteRouter);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

export default app;
