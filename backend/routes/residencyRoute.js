import express from "express";
import {
    createResidency,
    getAllResidencies,
    getResidency,
    updateResidency,
    deleteResidency,
} from '../controllers/resdCntrl.js';
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/create", jwtCheck, createResidency);
router.get("/all", getAllResidencies); // Public route
router.get("/:id", getResidency); // Public route
router.put("/update/:id", jwtCheck, updateResidency);
router.delete("/delete/:id", jwtCheck, deleteResidency);

export default router;