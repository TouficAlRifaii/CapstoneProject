import "../../CSS/DropList.css";

const DropListSubjects = ({ disabled, subject, setSubject }) => {
  console.log(subject);
  return (
    <select
      disabled={disabled}
      id="subject"
      value={subject}
      onChange={(event) => setSubject(event.target.value)}
    >
      <option value="">Select a subject</option>
      <option value="CSC">CSC</option>
      <option value="MTH">MTH</option>
      <option value="BIF">BIF</option>
      <option value="STA">STA</option>
    </select>
  );
};

export default DropListSubjects;
