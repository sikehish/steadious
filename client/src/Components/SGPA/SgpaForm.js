import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import "./SgpaForm.css";

function SgpaForm({ setIsClicked, totalInfo, setTotalInfo }) {
  const [sgpaInfo, setSgpaInfo] = useState({ pts: "", crdts: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      setTotalInfo((prev) => [
        ...prev,
        { ...sgpaInfo, id: Math.random().toString() },
      ]);
    } else {
      setTotalInfo((prev) => {
        console.log(prev[editId]);
        prev[editId] = { ...prev[editId], ...sgpaInfo };
        return prev;
      });
      setIsEdit(false);
    }
    setSgpaInfo({ pts: "", crdts: "" });
    setIsClicked(false);
  };

  const handleDelete = (id) => {
    setTotalInfo((prev) => {
      return prev.filter((el) => {
        return el.id !== id;
      });
    });
  };

  const handleEdit = (id) => {
    const ind = totalInfo.findIndex((el) => el.id === id);
    setSgpaInfo({ crdts: totalInfo[ind].crdts, pts: totalInfo[ind].pts });
    setEditID(ind);
    setIsEdit(true);
  };

  return (
    <div className="form-container">
      <article className="sgpa-article">
        <h3>SGPA Calculator</h3>
        <form onSubmit={handleSubmit}>
          <label className="grade-pts">
            Grade Points
            <input
              type="number"
              min="0"
              max="10"
              onChange={(e) =>
                setSgpaInfo((prev) => ({ ...prev, pts: e.target.value }))
              }
              value={sgpaInfo.pts}
              required
            />
          </label>

          <label className="crdts">
            Credits
            <input
              type="number"
              min="1"
              max="6"
              step="0.5"
              onChange={(e) =>
                setSgpaInfo((prev) => ({ ...prev, crdts: e.target.value }))
              }
              value={sgpaInfo.crdts}
              required
            />
          </label>

          <button type="submit" className="add-btn">
            {isEdit ? <FaEdit /> : <FaPlusCircle />}
          </button>
        </form>

        <div>
          {totalInfo.length > 0 &&
            totalInfo.map((el, ind) => (
              <ul className="sgpa-result" key={el.id}>
                <li>Subject-{ind + 1} </li>
                <li>Grade Points: {el.pts} </li>
                <li>Credits: {el.crdts}</li>
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

export default SgpaForm;
