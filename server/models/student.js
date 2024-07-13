const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  genre: { type: String, enum: ['Male', 'Female', 'Other'] },
  birthDate: { type: Date },
  verificationCode: { type: Number } ,
  phone: { type: String, required: false },
  street: { type: String, required: false },
  city: { type: String, required: false },
  postalCode: { type: String, required: false },
  country: { type: String, required: false },
  educationLevel: { type: String, required: false },
  school: { type: String, required: false } ,
  profilePicture: { type: String, required: false }
});

studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const Student = mongoose.model("Student", studentSchema);

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label("Confirm Password")
  });
  return schema.validate(data);
};

module.exports = { Student, validate };
