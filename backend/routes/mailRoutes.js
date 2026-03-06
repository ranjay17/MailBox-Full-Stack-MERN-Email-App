import express from "express";
import { composeMail, getInbox, getSent, markAsRead, deleteMail } from "../controllers/mailController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/compose', auth, composeMail);
router.get('/inbox', auth, getInbox);
router.get('/sent', auth, getSent);
router.put('/read/:id', auth ,markAsRead);
router.delete("/:id", auth, deleteMail);


export default router;