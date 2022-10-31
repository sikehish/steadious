import React, { useEffect, useRef, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import "./AttendanceForm.css";
import { useAuthContext } from "../../Hooks/AuthContext";

function AttendanceForm({
  setAllInfo,
  allInfo,
  days,
  setDays,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  holidays,
  missed,
  subject,
  isEdit,
  setIsEdit,
  editID,
  setEditID,
  // setTotal,
  // setIsError,
  // isError,
}) {
  const [placeholder, setPlaceholder] = useState("Select");
  const [isShow, setIsShow] = useState(false);
  const { state } = useAuthContext();

  let isError = false;

  // useEffect(() => {
  //   let timer;
  //   if (isError) {
  //     setTimeout(() => {
  //       setIsShow(false);
  //     }, 3000);
  //   }
  // }, [isError]);

  const dayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const ops = dayArr.map((el) => {
    return { key: el };
  });
  const opsDefault = days.map((el) => {
    return { key: el };
  });

  const countDays = (day, start, end) => {
    console.log(start, end);
    let sum = 0;
    if (start > end) return;
    while (start.getTime() <= end.getTime()) {
      if (start.getDay() === day) sum++;
      start.setDate(start.getDate() + 1);
    }
    return sum;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let total = 0;
    days.forEach((el) => {
      const day = dayArr.findIndex((val) => el === val);
      const sum = countDays(day, new Date(startDate), new Date(endDate));
      total += sum;
      // setDaysObj((prev) => ({
      //   ...prev,
      //   currentDays: current,
      //   totalDays: total,
      // }));
    });

    // setTotal(total);

    if (days.length < 1 || total <= 0 || total - missed < 0) {
      // setIsError(true);
      isError = true;
      setIsShow(true);
    } else {
      // setIsError(false);
      isError = false;
      setIsShow(false);
    }
    // console.log(
    //   days,
    //   dates,
    //   total,
    //   current,
    //   subject.current.value,
    //   holidays.current.value,
    //   missed.current.value
    // );
    // console.log(holidays.current.value)

    const data = {
      days: days,
      startDate,
      endDate,
      total,
      holidays: holidays.current.value,
      missed: missed.current.value,
      subject: subject.current.value.trim(),
    };

    if (!isError && !isEdit) {
      console.log(isError, total, days.length);
      try {
        const res = await fetch(`http://localhost:8000/api/attn`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        setAllInfo((prev) => [...prev, json]);
      } catch (err) {
        console.log(err);
      }
    } else if (!isError && isEdit) {
      console.log(allInfo[editID]._id, allInfo[editID].subject);
      const res = await fetch(
        `http://localhost:8000/api/attn/${allInfo[editID]._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
          body: JSON.stringify(data),
        }
      );
      const json = await res.json();

      setAllInfo((prev) => {
        prev[editID] = json;
        return prev;
      });
      if (!isError) setIsEdit(false);
    }
    console.log(allInfo);
  };

  // useEffect(() => {
  //   if (!isError)
  //     if (Object.keys(details).length > 0)
  //       setAllInfo((prev) => [...prev, details]);
  // }, [details, isError]);

  useEffect(() => {
    console.log(allInfo);
    if (!isError && !isEdit && allInfo) {
      console.log("IN USEFFECT", days);
      setStartDate("");
      setEndDate("");
      setDays([]);
      holidays.current.value = 0;
      missed.current.value = 0;
      subject.current.value = "";
      // setTotal("");
    }
  }, [allInfo, isError, isEdit]);

  // function dateFormat(d) {
  //   const date = new Date(new Date(d).setDate(new Date(d).getDate() + 1));
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   console.log(`${year}-${month}-${day}`);
  //   return `${year}-${month}-${day}`;
  // }

  return (
    <section className="attendance-form">
      <form onSubmit={handleSubmit}>
        <label className="subject-input">
          Enter subject name:
          <input type="text" placeholder="Electronics" ref={subject} required />
        </label>

        <div className="dates-inputs">
          <label className="start-date">
            Start date:
            <input
              type="date"
              id="start"
              name="trip-start"
              value={startDate}
              max={endDate || new Date().toISOString().split("T")[0]}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>

          <label className="end-date">
            End date:
            <input
              type="date"
              id="end"
              name="trip-end"
              value={endDate}
              min={startDate || new Date().toISOString().split("T")[0]}
              //    disabled={!Boolean(dates.start)}
              required //yyyy-mm-dd format is required- returns day+1 as the min end date
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>

        <div className="days-container">
          <label htmlFor="multiselect" className="select-days">
            Select days:
          </label>
          <Multiselect
            id="multiselect"
            className="multi-select"
            displayValue="key"
            // onKeyPressFn={(e)=>console.log(e)}
            onRemove={(e) => setDays(e.map((ele) => ele.key))}
            // onSearch={(e)=>console.log(e)}
            onSelect={(e) => setDays(e.map((ele) => ele.key))}
            selectedValues={opsDefault}
            avoidHighlightFirstOption={true}
            options={ops}
            showCheckbox
            placeholder={placeholder}
            // required
          />
        </div>

        <label className="classes-missed">
          Classes Missed?
          <input
            type="number"
            name=""
            defaultValue="0"
            min="0"
            id="classes-missed"
            ref={missed}
            required
          />
        </label>

        <label className="classes-cancelled">
          Classes Cancelled/Holidays?
          <input
            type="number"
            name=""
            min="0"
            defaultValue="0"
            id="classes-cancelled"
            ref={holidays}
            required
          />
        </label>

        {
          <button type="submit" className="attendance-calculate">
            {isEdit ? "Edit" : "Calculate"}
          </button>
        }

        {isShow && (
          <p style={{ color: "red" }}>Attendance input out of range</p>
        )}
      </form>
    </section>
  );
}

export default AttendanceForm;
