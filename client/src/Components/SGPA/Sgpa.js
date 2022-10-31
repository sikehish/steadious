import React, { useState } from "react";
import SgpaForm from "./SgpaForm";
import SgpaBar from "./SgpaBar";
import SgpaResult from "./SgpaResult";
import "./Sgpa.css";

function Sgpa() {
  // const [sgpaInfo, setSgpaInfo] =useState({pts:'', crdts:''})
  // const {totalInfo, setTotalInfo} = useState([])
  const [isClicked, setIsClicked] = useState(false);
  const [totalInfo, setTotalInfo] = useState([]);

  return (
    <section className="sgpa">
      <SgpaBar />
      <SgpaForm
        setIsClicked={setIsClicked}
        totalInfo={totalInfo}
        setTotalInfo={setTotalInfo}
      />
      {isClicked && totalInfo.length > 0 && (
        <SgpaResult totalInfo={totalInfo} />
      )}
    </section>
  );
}

export default Sgpa;
