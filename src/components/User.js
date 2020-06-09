import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import { Link } from "react-router-dom";

const User = props => {
    const initialUserState = {
        id: null,
        username: "",
        password: "",
        isBlocked: false
    };
    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [message, setMessage] = useState("");

    const getUser = id => {
        UserDataService.get(id)
            .then(response => {
                setCurrentUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const updateBlocked = status => {
        var data = {
            id: currentUser.id,
            username: currentUser.username,
            password: currentUser.password,
            isBlocked: status
        };

        UserDataService.update(currentUser.id, data)
            .then(response => {
                setCurrentUser({ ...currentUser, published: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

            window.location.reload("false");
    };

    const updateUser = () => {
        UserDataService.update(currentUser.id, currentUser)
            .then(response => {
                console.log(response.data);
                setMessage("The user was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });

    };

    const deleteUser = () => {
        UserDataService.remove(currentUser.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/users");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentUser ? (
                <div className="edit-form">
                    <h4>User</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={currentUser.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={currentUser.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentUser.isBlocked ? " Blocked" : " Active"}
                        </div>
                    </form>

                    {currentUser.isBlocked ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateBlocked(false)}
                        >
                            Unblock
                        </button>
                    ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => updateBlocked(true)}
                            >
                                Block
                            </button>
                        )}

                    <button className="badge badge-danger mr-2" onClick={deleteUser}>
                        Delete
          </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateUser}
                    >
                        Update
          </button>

                    <Link
                        to={"/users"}
                        className="badge badge-info m-2"
                    >
                        Back to Users
            </Link>

                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Please click on a User...</p>
                    </div>
                )}
        </div>
    );
};

export default User;