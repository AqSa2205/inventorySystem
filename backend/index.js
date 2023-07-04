const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const uri = "mongodb://localhost:27017/inventory";

app.use(express.json());
app.use(cors());

(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
})();

const formDataSchema = new mongoose.Schema({
  vname: String,
  pono: String,
  inNum: String,
  item: String,
  icode: String,
  spec: String,
  brand: String,
  price: Number,
  qty: Number,
  vphNum: Number,
  date: Date,
});

const FormData = mongoose.model("FormData", formDataSchema);

app.post("/add", async (req, res) => {

  const formData = req.body;
  const newFormData = new FormData(formData);

  try {
    await newFormData.save();
    const response = {
      message: "Form submitted successfully",
      data: newFormData,
    };
    res.json(response);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/", async (req, res) => {
  try {
    const allFormData = await FormData.find();
    res.json(allFormData);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/", (req, res) => {
  res.send("the app is working");
});
app.listen(5000, () => {
  
});
