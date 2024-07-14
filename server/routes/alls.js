const express = require("express");
const router = express.Router();
const { All } = require("../models/all");

// CREATE
router.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const newItem = new All(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/getByEmailAndToday/:email", async (req, res) => {
  try {
    console.log(req.body);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const items = await All.find({
      email: req.params.email,
      dateOf: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (items && items.length > 0) {
      res.status(200).json(items);
    } else {
      res.status(404).json({ error: "Items not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// READ (Get All)
router.get("/get", async (req, res) => {
  try {
    const allItems = await All.find();
    res.status(200).json(allItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ (Get by ID)
router.get("/get/:id", async (req, res) => {
  try {
    const item = await All.findById(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/getByEmail/:email", async (req, res) => {
  try {
    const items = await All.find({ email: req.params.email });
    if (items && items.length > 0) {
      res.status(200).json(items);
    } else {
      res.status(200).json([]); 
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  try {
    const updatedItem = await All.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    // res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedItem = await All.findByIdAndDelete(req.params.id);
    if (deletedItem) {
      res.status(204).json();
    } else {
      // res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    // res.status(500).json({ error: error.message });
  }
});

module.exports = router;
