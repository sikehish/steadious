import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BiPlusCircle } from "react-icons/bi";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import "./AttendanceResult.css";

function AttendanceResult({ detail, isError, deleteAttn, editAttn, isEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const { days, startDate, endDate, total, holidays, missed, subject, _id } =
    detail;
  console.log(detail);

  let attn = 0;

  function findAtt(classes) {
    console.log(classes);
    classes -= holidays;
    const nr = classes - missed;
    const res = (nr / classes) * 100;
    // console.log(total, nr, classes, holidays, missed);
    return res - parseInt(res) ? Math.floor(res * 100) / 100 : res;
  }

  attn = findAtt(total);

  // useEffect(() => {
  //   if (isError) {
  //     setTimeout(() => {
  //       setIsShow(false);
  //     }, 3000);
  //   }
  // }, [isError]);

  return (
    <div className="card">
      {attn >= 0 && attn <= 100 && (
        <h3 className="font-black">Subject: {subject}</h3>
      )}
      {!!total && <p>Total classes: {total}</p>}
      {!!missed && <p>Classes missed: {missed}</p>}
      {!!total && <p>Total Classes Attended:{total - holidays - missed}</p>}
      {!!missed && <p>Classes cancelled/holidays: {holidays}</p>}
      {days.length > 0 && (
        <ul className="days-result">
          {days.map((day, ind) => (
            <li key={ind} className="rounded-full">
              {day}
            </li>
          ))}
        </ul>
      )}
      {attn >= 0 && attn <= 100 && (
        <div className="circle">
          <CircularProgressbar
            value={attn}
            text={`${attn}%`}
            styles={buildStyles({
              pathColor: "#44337a",
              textColor: "#080a52",
              trailColor: "aliceblue",
            })}
          />
        </div>
      )}
      {!isError && !isEdit && (
        <button
          type="button"
          style={{ marginTop: "17px", marginRight: "8px" }}
          onClick={() => deleteAttn(_id)}
        >
          <FaTrash />
        </button>
      )}
      {!isError && !isEdit && (
        <button
          type="button"
          style={{ marginTop: "17px" }}
          onClick={() => editAttn(_id)}
        >
          <FaEdit />
        </button>
      )}
    </div>
  );
}

export default AttendanceResult;
