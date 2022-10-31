import React from "react";

function SgpaResult({ totalInfo }) {
  const calcSgpa = () => {
    let sum = 0,
      totalcrdts = 0;
    for (const ele of totalInfo) {
      console.log(sum);
      sum += ele.crdts * ele.pts;
      totalcrdts += parseFloat(ele.crdts);
    }
    const res = sum / totalcrdts;
    console.log(sum, totalcrdts, res);
    return res - parseInt(res) ? Math.floor(res * 100) / 100 : res;
    // Precision upto 2 decimal places
  };

  const res = calcSgpa();

  return (
    <>
      <p className="sgpa-final-result">
        Your SGPA for this semester is <span>{res}</span>
      </p>
    </>
  );
}

export default SgpaResult;
