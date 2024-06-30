const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    uploadProfilePicture
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', auth, getUser);
router.put('/', auth, updateUser);
router.post('/uploadProfilePicture', auth, uploadProfilePicture);

module.exports = router;
