import express from 'express';
import { createUser, deleteUser, getUserDetails, Paid } from '../controller/vivahshulk.js';

const router = express.Router();


router.post('/create-user', createUser);
router.delete('/delete-user/:id', deleteUser);
router.post('/paid-shulk', Paid);
router.get('/get-users', getUserDetails);

export default router