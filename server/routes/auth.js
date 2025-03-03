const router = require("express").Router();
const { Student } = require("../models/student");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const student = await Student.findOne({ email: req.body.email });
        if (!student) return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(req.body.password, student.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

        if (!student.verified) {
            let token = await Token.findOne({ userId: student._id });
            if (!token) {
                token = await new Token({
                    userId: student._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
                const url = `${process.env.BASE_URL}students/${student.id}/verify/${token.token}`;
                await sendEmail(student.email, "Verify Email", url);
            }

            return res.status(400).send({ message: "An Email sent to your account please verify" });
        }

        const token = student.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;
