const express = require('express');
const router = express.Router();
const { getTutors, getTutor, createTutorProfile } = require('../controllers/tutorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getTutors);
router.get('/:id', getTutor);
router.post('/', protect, createTutorProfile);

module.exports = router;
