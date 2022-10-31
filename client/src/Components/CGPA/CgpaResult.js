import React from "react";

function CgpaResult({ totalInfo }) {
  const calcCgpa = () => {
    let sum = 0,
      totalcrdts = 0;
    for (const ele of totalInfo) {
      console.log(sum);
      sum += ele.crdts * ele.sgpa;
      totalcrdts += parseFloat(ele.crdts);
    }
    const res = sum / totalcrdts;
    // console.log(sum,totalcrdts, res)
    return res - parseInt(res) ? Math.floor(res * 100) / 100 : res;
    // Precision upto 2 decimal places
  };

  const res = calcCgpa();

  return (
    <>
      <p className="cgpa-final-result">
        Your CGPA for till semester-{totalInfo.length} is <span>{res}</span>
      </p>
    </>
  );
}

export default CgpaResult;
