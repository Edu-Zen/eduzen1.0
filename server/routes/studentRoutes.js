const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Student = require('../models/student');

// Create a new student
router.post('/students', async (req, res) => {
  const { email, password, firstName, lastName, birthDate, genre } = req.body;

  try {
    let student = new Student({ email, password, firstName, lastName, birthDate, genre });
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get a student by ID
router.get('/students/:id', async (req, res) => {
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

// Update a student by ID
router.put('/students/:id', async (req, res) => {
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

// Delete a student by ID
router.delete('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            console.log('Invalid ObjectId');
            return res.status(400).send('Invalid ObjectId');
        }

        console.log('Delete request received for ID:', studentId);

        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            console.log('Student not found');
            return res.status(404).send('Student not found');
        }

        console.log('Student removed successfully');
        res.status(200).send('Student removed');
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
