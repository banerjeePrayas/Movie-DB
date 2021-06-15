import React, { useState, useEffect } from 'react'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
display: block;
border-color: red;
text-allign: center;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

function App() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#3F51B5");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
    setLoading(false);
    }, 2000)
}, []);

  return (
    <div className="sweet-loading">

      <DotLoader color={"#3F51B5"} loading={loading} css={override} size={150} />
    </div>
  );
}

export default App;