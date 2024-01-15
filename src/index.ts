import "dotenv/config";
import { createServer } from "http";
import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import { json } from "body-parser";
import mongoose from "mongoose";
import { month_t, daily_schedule_t, monthly_schedule_t, daysInMonth } from './objects';
import * as fs from 'fs';

const app = express();

app.use(cookieParser());
app.use(json());


app.get("/api/hello", (req, res) => {
    res.send("world");
});

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

/*
async function init() {
 
  if (!process.env.MONGO_CONNECTION_STRING) {
        throw new Error("Must provide connection string for mongodb");
    }

    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        dbName: "app-db-name"
    });
    server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
}

init();
*/



 let schedules: monthly_schedule_t[] = [];

const scheduleFilePath = './data/schedule.json';
try {
  const scheduleFileContent = fs.readFileSync(scheduleFilePath, 'utf-8');
  schedules = JSON.parse(scheduleFileContent);
} catch (error: any) {
  console.error(`Error reading or parsing the schedule file: ${error.message}`);
}

app.post('/schedule', (req: Request, res: Response) => {
  try {
    const newSchedule: monthly_schedule_t = req.body;
    // More validation needed?
    validateSchedule(newSchedule);
    schedules.push(newSchedule);
    res.status(201).json(newSchedule);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/shifts/:empID/:year/:month', (req: Request, res: Response) => {
  try {
    const empID = parseInt(req.params.empID);
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const monthInfo: month_t = daysInMonth({ year, month, days: 0 });
    if (monthInfo.days === 0) {
      throw new Error(`Invalid month: ${month}`);
    }

    const userShifts = getUserShifts(empID, { year, month, days: monthInfo.days });

    res.status(200).json(userShifts);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});


app.get('/schedule/:year/:month', (req: Request, res: Response) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const monthInfo: month_t = daysInMonth({ year, month, days: 0 });
    if (monthInfo.days === 0) {
      throw new Error(`Invalid month: ${month}`);
    }

    const fullMonthSchedule = getFullMonthSchedule({ year, month, days: monthInfo.days });

    if (fullMonthSchedule) {
      res.status(200).json(fullMonthSchedule);
    } else {
      throw new Error('Month schedule not found');
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

function validateSchedule(newSchedule: monthly_schedule_t): void {
  // More validation needed?
  if (!newSchedule.monthUID || !newSchedule.shifts) {
    throw new Error('Invalid schedule format');
  }
}

function getUserShifts(empID: number, monthInfo: month_t): daily_schedule_t | null {
  const userSchedule = schedules.find((schedule) => schedule.monthUID.year === monthInfo.year && schedule.monthUID.month === monthInfo.month);

  if (userSchedule) {
    const userShifts = userSchedule.shifts.find((dailySchedule) => dailySchedule.shifts.some((shift) => shift.empID === empID));
    return userShifts || null;
  }

  return null;
}

function getFullMonthSchedule(monthInfo: month_t): monthly_schedule_t | null {
  const fullMonthSchedule = schedules.find((schedule) => schedule.monthUID.year === monthInfo.year && schedule.monthUID.month === monthInfo.month);

  return fullMonthSchedule || null;
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
