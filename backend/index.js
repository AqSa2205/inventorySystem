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

app.get("/findAll", async (req, res) => {
  try {
    const allFormData = await FormData.find();
    res.json(allFormData);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });

    console.log(data.formdatas)
  }
});
// app.get('/findAll', async (req, res) => {
//   try {
//     const data = await FormData.find();
//     res.json({ data: formData });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.get("/", (req, res) => {
  res.send("the app is working");
});
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
