const AddSession = ({ sessions, setSessions }) => {
  const addNewSession = () => {
    setSessions([...sessions, { days: "", start: "", end: "" }]);
  };

  const updateSession = (index, field, value) => {
    const updatedSessions = [...sessions];
    updatedSessions[index][field] = value;
    setSessions(updatedSessions);
  };

  return (
    <div>
      {sessions.map((session, index) => (
        <div key={index}>
          <h3>Session {index + 1}:</h3>
          <label htmlFor="days">
            Pick days
            <input
              type="radio"
              name={`days-${index}`}
              value="MWF"
              onChange={(event) =>
                updateSession(index, "days", event.target.value)
              }
              checked={session.days === "MWF"}
            />
            MWF
            <input
              type="radio"
              name={`days-${index}`}
              value="TR"
              onChange={(event) =>
                updateSession(index, "days", event.target.value)
              }
              checked={session.days === "TR"}
            />
            TR
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
