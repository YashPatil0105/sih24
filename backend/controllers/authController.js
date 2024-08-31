const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv");
const User = require("../model/user");

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(404).send("user not found");
        if (!user.password)
            return res.status(401).send("Please update your password");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) return res.status(400).send("wrong password");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
        });

        return res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json(error);
    }
};

const signUp = async (req, res) => {
    try {
        //check for existing user
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        //encrypting pass
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //creating new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user
        const user = await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { login, signUp };
