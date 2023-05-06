const ListDoctorSession = ({ doctor }) => {
  return (
    <td>
      <div>
        <h4>MWF</h4>
        {doctor.sessions
          .filter((session) => session.days === "MWF")
          .sort((a, b) => (a.start > b.start ? 1 : -1))
          .map((session, index) => (
            <div key={index}>
              {session.start} - {session.end}
            </div>
          ))}
      </div>
      <div>
        <h4>TR</h4>
        {doctor.sessions
          .filter((session) => session.days === "TR")
          .sort((a, b) => (a.start > b.start ? 1 : -1))
          .map((session, index) => (
            <div key={index}>
              {session.start} - {session.end}
            </div>
          ))}
      </div>
    </td>
  );
};

export default ListDoctorSession;
