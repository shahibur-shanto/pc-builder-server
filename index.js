require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxopl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("pc-builder");
    const productCollection = db.collection("pc-builder");
    const categoryCollection = db.collection("category");

    mongoose.connect(uri);

    app.get("/data", async (req, res) => {
      const cursor = productCollection.find({});
      const product = await cursor.toArray();

      // res.send("Hello My World!");
      res.send({ status: true, data: product });
    });
    app.get("/category", async (req, res) => {
      const cursor = categoryCollection.find({});
      const category = await cursor.toArray();

      // res.send("Hello My World!");
      res.send({ status: true, category: category });
    });

    app.get("/data/:id", async (req, res) => {
      const id = req.params.id;

      const result = await productCollection.findOne({ _id: ObjectId(id) });
      console.log(result);
      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello my World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
