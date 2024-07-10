import React from "react";
import axios from "axios";

const AuthPage = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;

    // Call onAuth immediately with the username (if needed)
    props.onAuth({ username: username, secret: username });

    // Make axios POST request to authenticate
    axios
      .post("http://localhost:3001/authenticate", { username: username })
      .then((response) => {
        const responseData = response.data;
        const user = { ...responseData, secret: username };
        props.onAuth(user); // Update onAuth with server response
      })
      .catch((error) => {
        console.log("Auth Error", error);
      });
  };

  console.log("hello", props);

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome 👋</div>

        <div className="form-subtitle">Set a username to get started</div>

        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
