import StuCSS from './StudentInfo.module.css';

function StudentInfo({ data }: any): JSX.Element {
  return (
    <div className={StuCSS.container}>
      <div className={StuCSS.firstHalf}>
        <h2>Profile Info</h2>
      </div>
      <div className={StuCSS.secondHalf}>
        <label>
          <p>
            <strong>Name : </strong>
            {data?.name}
          </p>
          <p>
            <strong>Level : </strong>
            {data?.level}
          </p>
          <p>
            <strong>Matric No. : </strong>
            {data?.matric_no.toUpperCase()}
          </p>
          <p>
            <strong>Course : </strong>
            {data?.course}
          </p>
          <p>
            <strong>Hostel : </strong>
            {data?.hostel}
          </p>
          <p>
            <strong>Room No. : </strong>
            {data?.room_number} ({data?.room_type})
          </p>
        </label>
      </div>
    </div>
  );
}

export default StudentInfo;
