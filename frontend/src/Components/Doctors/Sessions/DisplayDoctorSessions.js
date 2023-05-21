import React from "react";

const DisplayDoctorSessions = ({ doctor, day }) => {
    // Filter and sort sessions based on the specified day
  const sessions = doctor.sessions
    .filter((session) => session.days.includes(day))
    .sort((a, b) => (a.start > b.start ? 1 : -1));

  // If there are no sessions for the specified day, return null
  if (sessions.length === 0) {
    return null;
  }

  // Function to format the time in AM/PM format
  function formatTime(time) {
    const [hour, minute] = time.split(":");
    const formattedHour = parseInt(hour) % 12 || 12;
    const formattedMinute = minute.padStart(2, "0");
    const period = parseInt(hour) >= 12 ? "PM" : "AM";
    return `${formattedHour}:${formattedMinute} ${period}`;
  }

  return (
    <div className="table-data-sessions">
      <h4>
        {day}:<br />
      </h4>
      {sessions.map((session, index) => (
        <div className="table-sessions-time" key={index}>
          {formatTime(session.start)} to {formatTime(session.end)}
        </div>
      ))}
    </div>
  );
};

export default DisplayDoctorSessions;
