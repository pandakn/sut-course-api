import { Router } from "express";
import { getCourseData } from "../controllers/course.controller";

const router: Router = Router();

router.get("/", getCourseData);

export default router;
