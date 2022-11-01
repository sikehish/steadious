import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import "./CgpaForm.css";

function CgpaForm({ setIsClicked, totalInfo, setTotalInfo }) {
  const [cgpaInfo, setCgpaInfo] = useState({ sgpa: "", crdts: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      setTotalInfo((prev) => [
        ...prev,
        { ...cgpaInfo, id: Math.random().toString() },
      ]);
    } else {
      setTotalInfo((prev) => {
        console.log(prev[editId]);
        prev[editId] = { ...prev[editId], ...cgpaInfo };
        return prev;
      });
      setIsEdit(false);
    }
    setIsClicked(false);
    setCgpaInfo({ sgpa: "", crdts: "" });
  };

  const handleDelete = (id) => {
    setIsClicked(false);
    setTotalInfo((prev) => {
      return prev.filter((el) => {
        return el.id !== id;
      });
    });
  };

  const handleEdit = (id) => {
    const ind = totalInfo.findIndex((el) => el.id === id);
    console.log({ crdts: totalInfo[ind].crdts, sgpa: totalInfo[ind].sgpa });
    setCgpaInfo({ crdts: totalInfo[ind].crdts, sgpa: totalInfo[ind].sgpa });
    setEditID(ind);
    setIsEdit(true);
    setIsClicked(false);
  };

  return (
    <div className="form-container">
      <article className="cgpa-article">
        <h3>CGPA Calculator</h3>
        <form onSubmit={handleSubmit}>
          <label className="sgpa-pts">
            SGPA
            <input
              type="number"
              min="0"
              max="10"
              step="0.01"
              onChange={(e) =>
                setCgpaInfo((prev) => ({ ...prev, sgpa: e.target.value }))
              }
              value={cgpaInfo.sgpa}
            />
          </label>

          <label className="crdts">
            Total Credits
            <input
              type="number"
              step="0.5"
              onChange={(e) =>
                setCgpaInfo((prev) => ({ ...prev, crdts: e.target.value }))
              }
              value={cgpaInfo.crdts}
            />
          </label>

          <button type="submit" className="add-btn">
            {isEdit ? <FaEdit /> : <FaPlusCircle />}
          </button>
        </form>
        <div>
          {totalInfo.length > 0 &&
            totalInfo.map((el, ind) => (
              <ul key={el.id} className="cgpa-result">
                <li>Semester-{ind + 1} </li>
                <li>SGPA:{el.sgpa} </li>
                <li>Total Credits:{el.crdts}</li>
                {!isEdit && (
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDelete(el.id)}
                  >
                    <FaTrash />
                    {/* style={{ color: "rgba(255,0,0,0.8)" }} */}
                  </button>
                )}
                {!isEdit && (
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={(e) => handleEdit(el.id)}
                  >
                    <FaEdit />
                  </button>
                )}
              </ul>
            ))}
          {totalInfo.length > 0 && !isEdit && (
            <div className="bottom-btns">
              <button
                onClick={() => {
                  setTotalInfo([]);
                  setIsClicked(false);
                }}
              >
                Clear All
              </button>
              <button type="button" onClick={() => setIsClicked(true)}>
                Calculate
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default CgpaForm;
