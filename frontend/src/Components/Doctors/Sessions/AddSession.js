import CheckboxDay from "./CheckboxDay";

const AddSession = ({ sessions, setSessions }) => {
  // Function to add a new session
  const addNewSession = () => {
    // Check if the last session has all required fields
    const lastSession = sessions[sessions.length - 1];
    if (!lastSession.days || !lastSession.start || !lastSession.end) {
      return;
    }
    // Add a new session to the sessions array
    setSessions([...sessions, { days: "", start: "", end: "" }]);
  };

  // Function to update a session's field
  const updateSession = (index, field, value) => {
    const updatedSessions = [...sessions];
    const session = updatedSessions[index];
    if (field === "days") {
      // Handle updating the 'days' field
      const selectedDays = [...session.days];
      const dayIndex = selectedDays.includes(value);
      if (!dayIndex) {
        selectedDays.push(value);
      } else {
        const newIndex = selectedDays.indexOf(value);
        selectedDays.splice(newIndex, 1);
      }
      session.days = selectedDays.join("");
    } else {
      // Handle updating other fields (start and end)
      session[field] = value;
    }
    setSessions(updatedSessions);
  };

  // Function to remove a session
  const removeSession = (index) => {
    if (sessions.length === 1) {
      return;
    }
    const updatedSessions = sessions.filter((session, i) => i !== index);
    setSessions(updatedSessions);
  };

  return (
    <div>
      {sessions.map((session, index) => (
        <div key={index} className="session">
          <h3>Session {index + 1}:</h3>
          <label htmlFor="days" className="session-days">
            Pick days:
            <div>
              <CheckboxDay
                day="M"
                isChecked={session.days.includes("M")}
                onChange={(event) =>
                  updateSession(index, "days", event.target.value)
                }
              />
              <CheckboxDay
                day="T"
                isChecked={session.days.includes("T")}
                onChange={(event) =>
                  updateSession(index, "days", event.target.value)
                }
              />
              <CheckboxDay
                day="W"
                isChecked={session.days.includes("W")}
                onChange={(event) =>
                  updateSession(index, "days", event.target.value)
                }
              />
              <CheckboxDay
                day="R"
                isChecked={session.days.includes("R")}
                onChange={(event) =>
                  updateSession(index, "days", event.target.value)
                }
              />
              <CheckboxDay
                day="F"
                isChecked={session.days.includes("F")}
                onChange={(event) =>
                  updateSession(index, "days", event.target.value)
                }
              />
            </div>
          </label>
          <label htmlFor="appt" className="session-start">
            Choose start time:{" "}
            <input
              type="time"
              required
              value={session.start}
              onChange={(event) =>
                updateSession(index, "start", event.target.value)
              }
              timeFormat="24-hour"
            />
          </label>
          <label htmlFor="appt" className="session-end">
            Choose end time:{" "}
            <input
              type="time"
              required
              value={session.end}
              onChange={(event) =>
                updateSession(index, "end", event.target.value)
              }
              timeFormat="24-hour"
            />
          </label>
          <button
            className="remove-session-btn"
            onClick={() => removeSession(index)}
          >
            Remove Session
          </button>
        </div>
      ))}
      <button onClick={addNewSession} className="add-session-btn">
        Add another session
      </button>
    </div>
  );
};

export default AddSession;
