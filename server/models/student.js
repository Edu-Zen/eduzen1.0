const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },  // Add this line
  verified: { type: Boolean, default: false },
  genre: { type: String, enum: ['Male', 'Female', 'Other'] },
  birthDate: { type: Date },  // Corrected typo in birthDate
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
      // firstName: Joi.string().required().label("First Name"),
      // lastName: Joi.string().required().label("Last Name"),
      email: Joi.string().email().required().label("Email"),
      password: passwordComplexity().required().label("Password"),
      confirmPassword: Joi.ref('password'), // Confirm password should match password
  });
  return schema.validate(data);
};


module.exports = { Student, validate };
