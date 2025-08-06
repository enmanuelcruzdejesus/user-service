const { Router } = require('express');
const asyncHandler = require('../middlewares/async.middleware');
const validate = require('../middlewares/validation.middleware');
const {
  createUserSchema,
  updateUserSchema,
} = require('../schemas/user.schema');
const usersController = require('../controllers/user.controller');

const router = Router();

// Read all users
router.get('/', asyncHandler(usersController.listUsers));

// Read single user by ID
router.get('/:id', asyncHandler(usersController.getUser));

// Create user (name & zip validated by middleware)
router.post('/', validate(createUserSchema), asyncHandler(usersController.createUser));

// Update user (optional name/zip validated)
router.put('/:id', validate(updateUserSchema), asyncHandler(usersController.updateUser));

// Delete user
router.delete('/:id', asyncHandler(usersController.deleteUser));

// Bonus: current local time for user
router.get('/:id/localtime', asyncHandler(usersController.getLocalTime));

module.exports = router;