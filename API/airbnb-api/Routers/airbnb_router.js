const express = require("express");
const users = require("../../airbnb-api/Models/airbnb-model");

const router = express.Router();
//removed

router.get("/", async (req, res) => {
  try {
    return res.json(await users.find());
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  users
    .findById(id)
    .then((user) => {
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(401).json({ message: "User does not exist" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: "unable to retrieve user" });
    });
});
//heroku
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  users
    .deleteHouseById(id)
    .then((deleted) => {
      return res.status(201).json(deleted);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const update = req.body;

  users
    .update(id, update)
    .then((updated) => {
      return res.status(201).json(updated);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

module.exports = router;
