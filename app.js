import express from "express";
import quoteRouter from "./routes/quote.js";
// import dashRouter from "./routes/dash.js";

const app = express();
const PORT = process.env.PORT || 3000;

// So that we can understand any jsons that are returned
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

let page_visits = {};
let visits = function (req, res, next) {
  let counter = page_visits[req.originalUrl];
  if (counter || counter === 0) {
    page_visits[req.originalUrl] = counter + 1;
  } else {
    page_visits[req.originalUrl] = 1;
  }
  console.log(req.originalUrl, counter);
  next();
};

app.use(visits);

app.use("/quote", quoteRouter);
app.get("/dash", (req, res) => {
  res.json(page_visits);
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

export default app;
