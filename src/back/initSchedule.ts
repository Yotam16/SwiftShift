import * as fs from 'fs';
import { month_t, daily_schedule_t, monthly_schedule_t, daysInMonth } from './objects';

function generateEmptyMonthlySchedule(year: number, month: number): monthly_schedule_t {
  const monthInfo: month_t = daysInMonth({ year, month, days: 0 });

  if (monthInfo.days === 0) {
    throw new Error(`Invalid month: ${month}`);
  }
  const monthUID: month_t = { year, month, days: monthInfo.days };
  const shifts: daily_schedule_t[] = [];

  for (let day = 1; day <= monthInfo.days; day++) {
    shifts.push({ day, shifts: [] });
  }

  return { monthUID, shifts };
}


const schedule: monthly_schedule_t[] = [];

for (let year = 2024; year <= 2034; ++year) {
  for (let month = 1; month <= 12; ++month) {
    schedule.push(generateEmptyMonthlySchedule(year, month));
    console.log(`pushed month ${month} year ${year}`);
  }
}


const jsonContent = JSON.stringify(schedule, null, 2);
fs.writeFileSync('../../data/schedule.json', jsonContent);

console.log('Monthly schedule created and stored in monthly_schedule.json');
