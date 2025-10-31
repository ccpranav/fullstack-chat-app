import express from "express";
import axios from "axios";
import { aiChat } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/", aiChat);

export default router;
