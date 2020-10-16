const express = require("express");
const users = require("../Models/user-model");
const airbnb = require("../../airbnb-api/Models/airbnb-model");
const restrict = require("../../middleware/user-middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const saved = await users.add(user);
    res.status(201).json(saved);
    console.log("User Added");
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  let { username, password } = req.body;

  try {
    const [user] = await users.findBy({ username });
    const passwordValidation = await bcrypt.compare(password, user.password);

    if (!user || !passwordValidation) {
      return res.status(401).json({
        message: "Invalid Username or Password",
      });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        userRole: "basic",
      },
      process.env.JWT_SECRET || "This is a secret"
    );
    res.json({
      message: `Welcome ${user.username}`,
      token,
    });
  } catch (err) {
    next(err);
  }

  router.get("/", restrict(), async (req, res, next) => {
    try {
      res.json(await users.find());
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", restrict(), async (req, res, next) => {
    const id = req.params.id;

    users
      .findById(id)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(401).json({ message: "User does not exist" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Unable to retrieve user" });
      });
  });
});

router.post("/:id/housing", restrict(), (req, res) => {
  const id = req.params.id;
  const housing = req.body;
  const newHousing = { ...housing, user_id: id };

  airbnb
    .add(newHousing)
    .then((added) => {
      res.status(200).json(added);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
//heroku
router.get("/:id/housing", restrict(), (req, res) => {
  const id = req.params.id;

  airbnb
    .findByUser(id)
    .then((houses) => {
      res.status(201).json(houses);
    })
    .catch((err) => {
      res.status(500).json({ message: "unable to find any properties" });
    });
});

module.exports = router;
