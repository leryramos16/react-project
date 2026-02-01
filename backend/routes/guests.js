import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", (req, res) => {
    const { fullname, rooms } = req.body;

    console.log(fullname, rooms);

    res.json({
        success: true,
        message: "Guest saved",
    });
});



export default router;