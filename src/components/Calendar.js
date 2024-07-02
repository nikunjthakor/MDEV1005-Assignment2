import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarPage() {
  // State to store the selected date
  const [date, setDate] = useState(new Date());

  return (
    <div>
      {/* Header for the Calendar page */}
      <h2>Calendar</h2>
      
      {/* Calendar component from 'react-calendar' */}
      <Calendar onChange={setDate} value={date} />
      
      {/* Display the selected date */}
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
}

export default CalendarPage;
