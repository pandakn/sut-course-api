import express from "express";
import dotenv from "dotenv";
import router from "./routes/course.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/courses", router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
