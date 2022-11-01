import React, { useEffect, useRef, useState } from "react";
import AttendanceForm from "./AttendanceForm";
import AttendanceResult from "./AttendanceResult";
import "./Attendance.css";
import { useAuthContext } from "../../Hooks/AuthContext";

function Attendance({ allInfo, setAllInfo }) {
  const { state } = useAuthContext();
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [days, setDays] = useState([]);
  // const [total, setTotal] = useState('');
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const holidays = useRef(null);
  const missed = useRef(null);
  const subject = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/api/attn", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) if (data !== null) setAllInfo(data);
    };

    fetchData();
  }, []);

  const handleAllDelete = async () => {
    const res = await fetch(`http://localhost:8000/api/attn`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    });

    setAllInfo([]);
  };

  const deleteAttn = async (id) => {
    const res = await fetch(`http://localhost:8000/api/attn/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    });
    const data = await res.json();

    setAllInfo((prev) => {
      return prev.filter((ele) => {
        return id !== ele._id;
      });
    });
  };

  const editAttn = (id) => {
    const ind = allInfo.findIndex((el) => el._id === id);
    const {
      days,
      startDate: start,
      endDate: end,
      holidays: holi,
      missed: miss,
      subject: subj,
    } = allInfo[ind];
    console.log(days, start, end, holi, miss, subj);
    setDays(days);
    setStartDate(new Date(start).toISOString().slice(0, 10));
    setEndDate(new Date(end).toISOString().slice(0, 10));
    holidays.current.value = holi;
    missed.current.value = miss;
    subject.current.value = subj;
    setEditID(ind);
    setIsEdit(true);
  };

  return (
    <div className="attendance">
      <p>Enter your attendance details here </p>
      <AttendanceForm
        setAllInfo={setAllInfo}
        allInfo={allInfo}
        setIsError={setIsError}
        isError={isError}
        days={days}
        setDays={setDays}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        holidays={holidays}
        missed={missed}
        subject={subject}
        editID={editID}
        setEditID={setEditID}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        // setTotal={setTotal}
      />
      {allInfo && allInfo.length > 0 && (
        <div className="results-container">
          {allInfo.map((detail, index) => (
            <React.Fragment key={index}>
              <AttendanceResult
                detail={detail}
                deleteAttn={deleteAttn}
                isError={isError}
                editAttn={editAttn}
                isEdit={isEdit}
              />
            </React.Fragment>
          ))}
        </div>
      )}
      {allInfo && allInfo.length > 0 && !isEdit && !isError && (
        <button className="clear-all" onClick={handleAllDelete}>
          Clear all
        </button>
      )}
    </div>
  );
}

export default Attendance;
