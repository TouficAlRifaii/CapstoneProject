import React from "react";

const DisplayDoctorSessions = ({ doctor, day }) => {
  const sessions = doctor.sessions
    .filter((session) => session.days.includes(day))
    .sort((a, b) => (a.start > b.start ? 1 : -1));

  if (sessions.length === 0) {
    return null;
  }

  function formatTime(time) {
    const [hour, minute] = time.split(":");
    const formattedHour = parseInt(hour) % 12 || 12;
    const formattedMinute = minute.padStart(2, "0");
    const period = parseInt(hour) >= 12 ? "PM" : "AM";
    return `${formattedHour}:${formattedMinute} ${period}`;
  }

  return (
    <div>
      <h4>{day}</h4>
      {sessions.map((session, index) => (
        <div key={index}>
          {formatTime(session.start)} - {formatTime(session.end)}
        </div>
      ))}
    </div>
  );
};

export default DisplayDoctorSessions;
