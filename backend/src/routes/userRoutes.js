// routes/userRoutes.js
import express from 'express';
import { createUser,getUserDetails,getAllUsers, pujaChanda, khanaChanda, total, date, phone, pujaPaid, khanPaid} from '../controller/userController.js';

const router = express.Router();


router.post('/create-user', createUser);
router.get('/all-users', getAllUsers);

router.get('/:id', getUserDetails);
router.post('/puja/:id', pujaChanda);
router.post('/khana/:id',khanaChanda );
router.post('/total/:id',total );
router.post('/date/:id',date );
router.post('/phone/:id',phone );
router.post('/paypuja/:id', pujaPaid);
router.post('/paykhana/:id', khanPaid);


export default router;
