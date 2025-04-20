import express from 'express';
import {
  getMe,
  updateUserProfile,
  deleteUser
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.get('/profile', protect, getMe);
router.put('/profile', protect, updateUserProfile);
router.delete('/:id', protect, authorize('admin'), deleteUser);

export default router;