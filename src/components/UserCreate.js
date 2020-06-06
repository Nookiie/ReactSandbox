import React, { useState } from "react";
import UserDataService from "../services/UserService";
import { Link } from "react-router-dom";

const UserCreate = () => {
  const initialUserState = {
    id: null,
    username: "",
    password: "",
    isBlocked: false
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    var data = {
      id: null,
      username: user.username,
      password: user.password,
      isBlocked: user.isBlocked
    };

    UserDataService.create(data)
      .then(response => {
        setUser({
          id: response.data.id,
          username: response.data.username,
          password: response.data.password,
          isBlocked: response.data.isBlocked
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

//   const newUser = () => {
//     setUser(initialUserState);
//     setSubmitted(false);
//   };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>User saved successfully!</h4>
          <Link
              to={"/users"}
              className="badge badge-info"
            >
              Back to Users
            </Link>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              onChange={handleInputChange}
              name="password"
            />
          </div>

          <button onClick={saveUser} className="btn btn-success">
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCreate;