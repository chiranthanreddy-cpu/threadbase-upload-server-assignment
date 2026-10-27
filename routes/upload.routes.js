import { Router } from "express";
import upload from "../config/upload.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.post("/upload", verifyToken, (req, res, next) => {
  upload.single("avatar")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    return res.status(201).json({
      url: `/uploads/${req.file.filename}`,
    });
  });
});

export default router;
