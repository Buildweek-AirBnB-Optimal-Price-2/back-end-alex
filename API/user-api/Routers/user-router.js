const express = require("express");
const users = require("../Models/user-model");
const airbnb = require("../../airbnb-api/Models/airbnb-model");
const restrict = require("../../middleware/airbnb-middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", restrict, async (req, res) => {
  console.log("got here");
  return res.status(200).json(await users.find());
});

router.post("/register", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    console.log("adding user");
    const saved = await users.add(user);
    console.log("User Added");
    return res.status(201).json(saved);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err);
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
});

router.get("/:id", restrict, async (req, res, next) => {
  const id = req.params.id;

  users
    .findById(id)
    .then((user) => {
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(401).json({ message: "User does not exist" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: "Unable to retrieve user" });
    });
});

router.post("/:id/housing", restrict, (req, res) => {
  const id = req.params.id;
  const housing = req.body;
  const newHousing = { ...housing, user_id: id };

  airbnb
    .add(newHousing)
    .then((added) => {
      return res.status(200).json(added);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});
//heroku
router.get("/:id/housing", restrict, (req, res) => {
  const id = req.params.id;

  airbnb
    .findByUser(id)
    .then((houses) => {
      return res.status(201).json(houses);
    })
    .catch((err) => {
      return res.status(500).json({ message: "unable to find any properties" });
    });
});

module.exports = router;
