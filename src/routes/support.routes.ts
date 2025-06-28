// src/routes/supportRoutes.ts
import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { createSupportTicket, getAllSupportTickets } from '../controllers/support.controller';


const router = express.Router();

router.post('/support-ticket', isAuthenticated, createSupportTicket);
router.get('/all-support-ticket', isAuthenticated, getAllSupportTickets);

const supportRoutes = router;

export default supportRoutes;