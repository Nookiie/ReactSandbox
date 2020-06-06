import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchUsername, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchTitle = e => {
    const searchUsername = e.target.value;
    setSearchTitle(searchUsername);
  };

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const removeAllUsers = () => {
    UserDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByUsername = () => {
    UserDataService.findByUsername(searchUsername)
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by username"
            value={searchUsername}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByUsername}
            >
              Search
            </button>
          </div>
          <Link
            to={"/add"}
            className="btn btn-primary mr-2"
          >
            Add New
            </Link>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Users List</h4>


        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.username}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllUsers}
        >
          Remove All
        </button>

      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>Username:</strong>
              </label>{" "}
              {currentUser.username}
            </div>
            <div>
              <label>
                <strong>Password:</strong>
              </label>{" "}
              {currentUser.password}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentUser.isBlocked ? "Blocked" : "Active"}
            </div>

            <Link
              to={"/users/" + currentUser.id}
              className="badge badge-warning mr-2"
            >
              Edit
            </Link>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a User</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default UsersList;