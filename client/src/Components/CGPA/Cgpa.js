import React, { useState } from "react";
import CgpaForm from "./CgpaForm";
import CgpaResult from "./CgpaResult";

function Cgpa() {
  // const [sgpaInfo, setSgpaInfo] =useState({pts:'', crdts:''})
  // const {totalInfo, setTotalInfo} = useState([])
  const [isClicked, setIsClicked] = useState(false);
  const [totalInfo, setTotalInfo] = useState([]);

  return (
    <section className="cgpa">
      <CgpaForm
        setIsClicked={setIsClicked}
        totalInfo={totalInfo}
        setTotalInfo={setTotalInfo}
      />
      {isClicked && totalInfo.length > 0 && (
        <CgpaResult totalInfo={totalInfo} />
      )}
    </section>
  );
}

export default Cgpa;
