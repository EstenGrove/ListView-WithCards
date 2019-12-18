import { useState, useEffect } from "react";
import {
  getYear,
  isSameMonth,
  isSameWeek,
  eachDay,
  startOfWeek,
  lastDayOfWeek,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks
} from "date-fns";

export const isStringEmpty = str => {
  if (str.length < 1) {
    return true;
  }
  return false;
};

// format utility
export const formatDate = val => {
  if (val.constructor === Array) {
    return val.map(x => x.toString().slice(0, 10));
  }
  return val.toString().slice(0, 15);
};

export const useDates = (base = new Date()) => {
  const [currentYear, setCurrentYear] = useState(getYear(base));
  const [todaysDate, setTodaysDate] = useState(base);
  const [currentWeek, setCurrentWeek] = useState({
    weekStart: startOfWeek(base),
    weekEnd: lastDayOfWeek(base)
  });
  const [currentMonth, setCurrentMonth] = useState({
    monthStart: startOfMonth(base),
    monthEnd: endOfMonth(base)
  });
  // sets each day's date for the current week
  const [currentDays, setCurrentDays] = useState(
    eachDay(startOfWeek(base), lastDayOfWeek(base))
  );

  // all days in a month
  const [currentDaysInMonth, setCurrentDaysInMonth] = useState(
    eachDay(startOfMonth(base), endOfMonth(base))
  );

  const getNextWeek = (start = currentWeek.weekStart) => {
    const nextWeek = addWeeks(start, 1);

    setCurrentWeek({
      weekStart: startOfWeek(nextWeek),
      weekEnd: lastDayOfWeek(nextWeek)
    });
  };

  const getPrevWeek = (start = currentWeek.weekStart) => {
    const prevWeek = subWeeks(start, 1);

    setCurrentWeek({
      weekStart: startOfWeek(prevWeek),
      weekEnd: lastDayOfWeek(prevWeek)
    });
  };

  const getNextMonth = (start = currentMonth.monthStart) => {
    const nextMonth = addMonths(start, 1);

    setCurrentMonth({
      monthStart: startOfMonth(nextMonth),
      monthEnd: endOfMonth(nextMonth)
    });
  };

  const getPrevMonth = (start = currentMonth.monthStart) => {
    const prevMonth = subMonths(start, 1);

    setCurrentMonth({
      monthStart: startOfMonth(prevMonth),
      monthEnd: endOfMonth(prevMonth)
    });
  };

  // DATE HELPERS
  const sameWeek = (a, b) => {
    return isSameWeek(a, b);
  };

  const sameMonth = (a, b) => {
    return isSameMonth(a, b);
  };

  // update the days anytime weekStart/End changes
  useEffect(() => {
    setCurrentDays(eachDay(currentWeek.weekStart, currentWeek.weekEnd));
    setCurrentDaysInMonth(
      eachDay(currentMonth.monthStart, currentMonth.monthEnd)
    );
    setCurrentYear(currentMonth.monthStart);
  }, [
    currentWeek.weekStart,
    currentWeek.weekEnd,
    currentMonth.monthStart,
    currentMonth.monthEnd
  ]);

  return {
    currentYear,
    todaysDate,
    sameWeek,
    sameMonth,
    currentDays,
    currentDaysInMonth,
    currentWeek,
    currentMonth,
    getPrevWeek,
    getNextWeek,
    getPrevMonth,
    getNextMonth
  };
};
