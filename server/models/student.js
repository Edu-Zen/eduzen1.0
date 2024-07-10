const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const studentSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  verified: { type: Boolean, default: false },
  genre: { type: String, enum: ['Male', 'Female', 'Other'] },
  birthDate: { type: Date },
  verificationCode: { type: Number }
});

studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const Student = mongoose.model("student", studentSchema);

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    confirmPassword: Joi.ref('password'),
  });
  return schema.validate(data);
};

module.exports = { Student, validate };
