import { Request, Response } from "express";
import connectRedis from "../utils/connect-redis";
import { scrapeCourseData } from "../scraping/scraper";

const redisClient = connectRedis();

const getCourseData = async (req: Request, res: Response) => {
  const {
    maxrow,
    acadyear,
    semester,
    coursecode,
    coursename,
    cmd = 2,
    weekdays,
    timefrom,
    timeto,
  } = req.query as Record<string, string>;

  // Use the query parameters to build the URL for the course data
  let url = `http://reg.sut.ac.th/registrar/class_info_1.asp?coursestatus=O00&facultyid=all&maxrow=${maxrow}&acadyear=${acadyear}&semester=${semester}&CAMPUSID=&LEVELID=&coursecode=${coursecode}&coursename=${coursename}&cmd=${cmd}`;

  // use filter course by day and time
  if (cmd === "1") {
    url += `&weekdays=${weekdays}&timefrom=${timefrom}&timeto=${timeto}`;
  }

  const cacheKey = `${coursecode}:${coursename}:${semester}:${acadyear}:${
    weekdays || ""
  }:${timefrom || ""}:${timeto || ""}`;

  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    res.send(JSON.parse(cachedData));
    return;
  }

  // Call the getCourseData function with the URL and return the data in the response
  const courseData = await scrapeCourseData(url);

  if (!courseData) {
    res.status(400).json({ error: "No course data found" });
    return;
  }

  const jsonData = {
    data: {
      year: `${semester}/${acadyear}`,
      courseData,
    },
  };

  // expire 1 hr.
  await redisClient.set(cacheKey, JSON.stringify(jsonData), { EX: 3600 });
  res.json(jsonData);
};

export { getCourseData };
