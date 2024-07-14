require("dotenv").config();
const { Router } = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../db.js");
const localization = require("../controllers/Localization.js");

const router = Router();

router.post("/", async (req, res) => {
    let { email, nickname, name, picture, password, originCountry, originCity } = req.body;
    const saltRounds = 10;

    if (!email) {
        return res.status(400).json("No email provided");
    }

    if (!originCountry || !originCity) {
        return res.status(400).json({ error: "Origin country or city is not provided" });
    }

    const isValidOrigin = localization.some(entry =>
        entry.cities.includes(originCity) && entry.country === originCountry
    );

    if (!isValidOrigin) {
        return res.status(400).json({ error: "Invalid origin selected" });
    }

    try {
        const whereisuser = await User.findOne({
            where: {
                email: email
            }
        });

        if (whereisuser) {
            if (!whereisuser.available) {
                return res.status(400).send("User not available");
            }
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newuser = await User.create({
            email,
            nickname,
            name,
            picture,
            password: hashedPassword,
            originCountry,
            originCity
        });

        return res.status(201).send(newuser);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = router;
