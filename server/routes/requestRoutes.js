const express = require('express');
const router = express.Router();
const { createRequest, getTutorRequests, updateRequestStatus } = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createRequest);
router.get('/tutor', protect, getTutorRequests);
router.put('/:id', protect, updateRequestStatus);

module.exports = router;
