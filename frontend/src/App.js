import React, { useState, useEffect } from 'react'
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home'
import AddMovie from './screens/AddMovie'
import Header from './components/Header'
import Footer from './components/Footer'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";

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

  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);
  return (
    <Router>
      { isLoading ? ( <DotLoader color={"#123abc"} loading={isLoading} css={override}  size={150} /> ) : (
        <>
        <Header />
        <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/edit/:id" component={AddMovie} exact />
          {/* <Route path="/edit/:id" component={Trial} exact /> */}
        </Switch>
        </main>
        <Footer />
      </>
      )}
      
    </Router>
  );
}

export default App;
