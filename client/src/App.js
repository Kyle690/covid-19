import React from 'react';
import {Router, Route} from "react-router-dom";
import history from "./history";

// Route Components
import Main from "./View/Main";

function App() {
  return (
      <Router history={history}>
          <Route path={'/'} component={Main}/>
      </Router>
  )
}

export default App;
