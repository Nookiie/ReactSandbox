import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import User from "./components/User";
import UsersList from "./components/UsersList";
import UserCreate from "./components/UserCreate";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/users" className="navbar-brand">
            User Application
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/users"]} component={UsersList} />
            <Route exact path="/add" component={UserCreate} />
            <Route path="/users/:id" component={User} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;