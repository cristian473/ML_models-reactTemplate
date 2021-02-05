// Import dependencies
import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from "./components/home";
import Iris from "./components/iris/index";
import ObjectDetection from "./components/objectDetection/objectDetection";
import Tuberculosis from "./components/tuberculosis";

function App() {
  return (
    <Switch>      
      <Route exact path='/' component={Home} />
      <Route exact path='/object-detection' component={ObjectDetection} />
      <Route exact path='/iris' component={Iris} />
      <Route exact path='/tuberculosis' component={Tuberculosis} />
    </Switch>
  );
}

export default App;
