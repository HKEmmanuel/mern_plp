const Request = require('../models/Request');

// @desc    Create a new request
// @route   POST /api/requests
// @access  Private (Student)
exports.createRequest = async (req, res) => {
  try {
    const { tutorId, subject, level, message } = req.body;

    const request = await Request.create({
      student: req.user.id,
      tutor: tutorId,
      subject,
      level,
      message
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get requests for logged in tutor
// @route   GET /api/requests/tutor
// @access  Private (Tutor)
exports.getTutorRequests = async (req, res) => {
  try {
    const requests = await Request.find({ tutor: req.user.id })
      .populate('student', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update request status
// @route   PUT /api/requests/:id
// @access  Private (Tutor)
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    let request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Verify tutor owns this request
    if (request.tutor.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
