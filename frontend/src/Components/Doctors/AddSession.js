import CheckboxDay from "./CheckboxDay";

const AddSession = ({ sessions, setSessions }) => {
  const addNewSession = () => {
    setSessions([...sessions, { days: "", start: "", end: "" }]);
  };

  const updateSession = (index, field, value) => {
    const updatedSessions = [...sessions];
    const session = updatedSessions[index];
    if (field === "days") {
      console.log("DAYS " + value);
      const selectedDays = [...session.days];
      console.log("Selected DAys " + selectedDays);
      const dayIndex = selectedDays.includes(value);
      console.log(dayIndex);
      if (dayIndex === false) {
        selectedDays.push(value);
      } else {
        console.log("it already exists");
        selectedDays.pop(value);
      }
      session.days = selectedDays.join("");
    } else {
      session[field] = value;
    }
    setSessions(updatedSessions);
  };

  return (
    <div>
      {sessions.map((session, index) => (
        <div key={index}>
          <h3>Session {index + 1}:</h3>
          <label htmlFor="days">
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
          <label htmlFor="appt">
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
          <label htmlFor="appt">
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
        </div>
      ))}
      <button onClick={addNewSession}>Add Session</button>
    </div>
  );
};

export default AddSession;
