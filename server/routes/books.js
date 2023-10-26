import express from "express";
import { add, getAllBooks, getBook, remove, test, update } from "../controllers/book.js";

const router = express.Router();

router.get("/test", test);

router.post("/add", add);

router.put("/update/:id", update);

router.delete("/remove/:id", remove);

router.get("/getBook/:id", getBook);

router.get("/getAllBooks", getAllBooks);

export default router;