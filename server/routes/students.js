const router = require("express").Router();
const { Student, validate } = require("../models/student");
// const Token = require("../models/token");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");

// Function to generate a 6-digit verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/register", async (req, res) => {
  try {
    console.log("first");
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let student = await Student.findOne({ email: req.body.email });
    if (student)
      return res
        .status(409)
        .send({ message: "Student with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Generate verification code
    const verificationCode = generateVerificationCode();

    // Save student details and verification code
    student = await new Student({
      ...req.body,
      password: hashPassword,
      verificationCode,
    }).save();

    // Send email with verification code
    await sendEmail(
      student.email,
      "Verify Email",
      `Your verification code is: ${verificationCode}`
    );

    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get a student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get a student by Email
router.get("/email/:email", async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email });
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Update a student by Email

router.post("/update/:email", async (req, res) => {
  const { firstName, lastName, birthDate, genre } = req.body;
  try {
    console.log("eeeeeeeeeee");
    const student = await Student.findOneAndUpdate(
      { email: req.params.email },
      { firstName, lastName, birthDate, genre },
      { new: true }
    );
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Add this route to your existing router in the backend
router.post("/verify-email", async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Find the student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    // Check if verification code matches
    if (student.verificationCode !== parseInt(verificationCode)) {
      return res.status(400).send({ message: "Invalid verification code" });
    }

    // Update student to mark as verified
    student.verified = true;
    student.verificationCode = null; // Clear verification code
    await student.save();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

 // Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


// get student by id

router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


// // Update a student by ID
router.put('/:id', async (req, res) => {
  const { email, password, firstName, lastName, birthDate, genre } = req.body;

  try {
    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    student.email = email;
    student.password = password;
    student.firstName = firstName;
    student.lastName = lastName;
    student.birthDate = birthDate;
    student.genre = genre;
    await student.save();
    res.status(200).json(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.get('/email/:email', async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email });
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});
module.exports = router;

// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();
// const Student = require('../models/student');

// // Create a new student
// router.post('/students', async (req, res) => {
//   const { email, password, firstName, lastName, birthDate, genre } = req.body;

//   try {
//     let student = new Student({ email, password, firstName, lastName, birthDate, genre });
//     await student.save();
//     res.status(201).send(student);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// // Get all students
// router.get('/students', async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.status(200).json(students);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// // Get a student by ID
// router.get('/students/:id', async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) {
//       return res.status(404).send('Student not found');
//     }
//     res.status(200).json(student);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// // Update a student by ID
// router.put('/students/:id', async (req, res) => {
//   const { email, password, firstName, lastName, birthDate, genre } = req.body;

//   try {
//     let student = await Student.findById(req.params.id);
//     if (!student) {
//       return res.status(404).send('Student not found');
//     }
//     student.email = email;
//     student.password = password;
//     student.firstName = firstName;
//     student.lastName = lastName;
//     student.birthDate = birthDate;
//     student.genre = genre;
//     await student.save();
//     res.status(200).json(student);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// // Delete a student by ID
// router.delete('/students/:id', async (req, res) => {
//     try {
//         const studentId = req.params.id;

//         // Validate ObjectId
//         if (!mongoose.Types.ObjectId.isValid(studentId)) {
//             console.log('Invalid ObjectId');
//             return res.status(400).send('Invalid ObjectId');
//         }

//         console.log('Delete request received for ID:', studentId);

//         const deletedStudent = await Student.findByIdAndDelete(studentId);

//         if (!deletedStudent) {
//             console.log('Student not found');
//             return res.status(404).send('Student not found');
//         }

//         console.log('Student removed successfully');
//         res.status(200).send('Student removed');
//     } catch (err) {
//         console.error('Error during deletion:', err);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;
