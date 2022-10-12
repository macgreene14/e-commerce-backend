const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({ include: [{ model: Product }] });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No Tag Found." });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    await Tag.create(req.body);
    res.status(200).json({ message: `${req.body.tag_name} Added to Tag DB.` });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    if (!req.params.id || !req.body.tag_name) {
      res.status(404).json({ message: "Please provide id and tag_name." });
      return;
    }

    await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ message: `${req.body.tag_name} Added to DB.` });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    await Tag.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: `${req.params.id} Deleted from DB.` });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
