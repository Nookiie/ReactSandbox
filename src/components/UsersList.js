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

    setSearchTitle("");
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const findByUsername = () => {
    if (searchUsername.trim() === "") {
      refreshList();

      return;
    }

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
              className="btn btn-outline-primary"
              type="button"
              onClick={findByUsername}
            >
              Search
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={refreshList}
            >
              Clear
            </button>
          </div>
          <Link
            to={"/add"}
            className="btn btn-primary ml-2 mr-6"
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
            <button
              onClick={refreshList}
              className="badge badge-info mr-2"
            >
              Unselect
            </button>
          </div>
        ) : (
            <div>
              <br />
              <p>Please select a <b>User</b> from the <b>Users List</b></p>
            </div>
          )}
      </div>
    </div>
  );
};

export default UsersList;