// string types for users

export type uname_t = string & { __customStringBrand: never }; // username: length 5-16, letters, digits and _-
export type pass_t = string & { __customStringBrand: never };  // password: length 8-16 all chars
export type name_t = string & { __customStringBrand: never };  // name: length 2-16 letters only
export type email_t = string;
export type phone_t = string;


// types for schedule DB
export type month_t = {
    year : number;
    month : number;
    days : number;
}

export type hour_t = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23}:${0 | 15 | 30 | 45}`;


export type shift_t = {
    empID : number;
    month : month_t;
    start : hour_t;
    end : hour_t;
}

export type daily_schedule_t = {
    day: number;
    shifts : shift_t[]; 
}

export type employee_t = {
    uname : string;
    fname : string;
    lname : string;
    email : string;
    created : Date;
    password : string;
}

export type monthly_schedule_t = {
    monthUID : month_t;
    shifts : daily_schedule_t[];
}

export function daysInMonth(month: month_t): month_t {
    const daysInEachMonth: number[] = [, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as number[];

    if (Number.isInteger(month.month) && month.month >= 1 && month.month <= 12) {
    const currentYear = new Date().getFullYear();
    daysInEachMonth[2] = (currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0)) ? 29 : 28;
    month.days = daysInEachMonth[month.month];
    } else {
    month.days = 0;
    }

    return month;
}

