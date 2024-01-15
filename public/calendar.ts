import { monthly_schedule_t, month_t } from './objects';

const currentMonthDisplay = document.getElementById('currentMonth') as HTMLSpanElement;
const calendarBody = document.getElementById('calendarBody') as HTMLTableSectionElement;
const prevMonthButton = document.getElementById('prevMonthButton') as HTMLButtonElement;
const nextMonthButton = document.getElementById('nextMonthButton') as HTMLButtonElement;
const prevYearButton = document.getElementById('prevYearButton') as HTMLButtonElement;
const nextYearButton = document.getElementById('nextYearButton') as HTMLButtonElement;

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();


async function getMonthlySchedule(month: month_t): Promise<monthly_schedule_t | null> {
    try {
      const response = await fetch(`/api/schedule?year=${month.year}&month=${month.month}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data: monthly_schedule_t = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching monthly schedule:', error);
      return null;
    }
  }
  

function renderCalendar() {
    currentMonthDisplay.textContent = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentYear, currentMonth))} ${currentYear}`;
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let dayCounter = 1;
    let calendarHTML = '';

    for (let i = 0; i < 6; i++) {
        calendarHTML += '<tr>';
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDayOfMonth) || dayCounter > lastDayOfMonth) {
                calendarHTML += '<td></td>';
            } else {
                calendarHTML += `<td>${dayCounter}</td>`;
                dayCounter++;
            }
        }
        calendarHTML += '</tr>';
    }

    calendarBody.innerHTML = calendarHTML;
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function prevYear() {
    currentYear--;
    renderCalendar();
}

function nextYear() {
    currentYear++;
    renderCalendar();
}

prevMonthButton.addEventListener('click', prevMonth);
nextMonthButton.addEventListener('click', nextMonth);
prevYearButton.addEventListener('click', prevYear);
nextYearButton.addEventListener('click', nextYear);

document.addEventListener('DOMContentLoaded', renderCalendar);
