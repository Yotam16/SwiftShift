import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { month_t, daily_schedule_t, monthly_schedule_t, daysInMonth } from './objects';
import * as fs from 'fs';

const app = express();
const port = 3000;

app.use(bodyParser.json());


let schedules: monthly_schedule_t[] = [];


const scheduleFilePath = '../../data/schedule.json';
try {
  const scheduleFileContent = fs.readFileSync(scheduleFilePath, 'utf-8');
  schedules = JSON.parse(scheduleFileContent);
} catch (error : any) {
  console.error(`Error reading or parsing the schedule file: ${error.message}`);
}

app.post('/schedule', (req: Request, res: Response) => {
  try {
    const newSchedule: monthly_schedule_t = req.body;
    // Validate the new schedule (you might want to add more validation logic)
    validateSchedule(newSchedule);
    schedules.push(newSchedule);
    res.status(201).json(newSchedule);
  } catch (error : any) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to get user's shifts by empID for a specific month
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
  } catch (error : any) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to get the full month's schedule for a specific month
app.get('/schedule/:year/:month', (req: Request, res: Response) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const monthInfo: month_t = daysInMonth({ year, month, days: 0 });
    if (monthInfo.days === 0) {
      throw new Error(`Invalid month: ${month}`);
    }

    const fullMonthSchedule = getFullMonthSchedule({ year, month, days: monthInfo.days });

    res.status(200).json(fullMonthSchedule);
  } catch (error : any) {
    res.status(400).json({ error: error.message });
  }
});

// Validation function for a new schedule
function validateSchedule(newSchedule: monthly_schedule_t): void {
  // Add your validation logic here (e.g., check for required fields, validate data types, etc.)
  if (!newSchedule.monthUID || !newSchedule.shifts) {
    throw new Error('Invalid schedule format');
  }
}

// Function to get user's shifts for a specific month
function getUserShifts(empID: number, monthInfo: month_t): daily_schedule_t | null {
  // Retrieve the user's shifts from the schedules array (you might want to use a database in a real-world scenario)
  const userSchedule = schedules.find((schedule) => schedule.monthUID.year === monthInfo.year && schedule.monthUID.month === monthInfo.month);

  if (userSchedule) {
    const userShifts = userSchedule.shifts.find((dailySchedule) => dailySchedule.shifts.some((shift) => shift.empID === empID));
    return userShifts || null;
  }

  return null;
}

// Function to get the full month's schedule for a specific month
function getFullMonthSchedule(monthInfo: month_t): monthly_schedule_t | null {
  // Retrieve the full month's schedule from the schedules array (you might want to use a database in a real-world scenario)
  const fullMonthSchedule = schedules.find((schedule) => schedule.monthUID.year === monthInfo.year && schedule.monthUID.month === monthInfo.month);

  return fullMonthSchedule || null;
}

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
