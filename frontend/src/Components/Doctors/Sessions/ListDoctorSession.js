import DisplayDoctorSessions from "./DisplayDoctorSessions";
const ListDoctorSession = ({ doctor }) => {
  return (
    <td>
      <DisplayDoctorSessions doctor={doctor} day="M" />
      <DisplayDoctorSessions doctor={doctor} day="T" />
      <DisplayDoctorSessions doctor={doctor} day="W" />
      <DisplayDoctorSessions doctor={doctor} day="R" />
      <DisplayDoctorSessions doctor={doctor} day="F" />
    </td>
  );
};

export default ListDoctorSession;
