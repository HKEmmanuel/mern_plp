const TutorProfile = require('../models/TutorProfile');
const User = require('../models/User');

// @desc    Get all tutors
// @route   GET /api/tutors
// @access  Public
exports.getTutors = async (req, res) => {
  try {
    const tutors = await TutorProfile.find().populate('user', 'name email');
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single tutor
// @route   GET /api/tutors/:id
// @access  Public
exports.getTutor = async (req, res) => {
  try {
    const tutor = await TutorProfile.findById(req.params.id).populate('user', 'name email');

    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or Update tutor profile
// @route   POST /api/tutors
// @access  Private (Tutor only)
exports.createTutorProfile = async (req, res) => {
  try {
    const {
      subject,
      level,
      rate,
      description,
      photo,
      availability
    } = req.body;

    // Build profile object
    const profileFields = {
      user: req.user.id,
      subject,
      level,
      rate,
      description,
      photo,
      availability
    };

    let profile = await TutorProfile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await TutorProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new TutorProfile(profileFields);
    await profile.save();
    res.json(profile);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
