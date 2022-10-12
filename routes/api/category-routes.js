const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No Category Found." });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No Category Found." });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    await Category.create(req.body);
    res
      .status(200)
      .json({ message: `${req.body.category_name} Added to Tag DB.` });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    if (!req.params.id || !req.body.category_name) {
      res.status(404).json({ message: "Please provide id and category_name." });
      return;
    }

    await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ message: `${req.body.category_name} Added to DB.` });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: `${req.params.id} Deleted from DB.` });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
