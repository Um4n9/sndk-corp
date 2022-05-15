import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

// lazy loading for components... here it won't matter because we are using both components in the route
const Login = React.lazy(() => import("./authModule/Login"));
const Task = React.lazy(() => import("./taskModule/Task"));

function App() {
  let navigate = useNavigate();

  // to cheack weather user is logged in or not by checking the session storage
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    // if auth token is present means user is logged in and should be redirected to task screen
    if (authToken) {
      navigate("/task");
    }

    // if auth token is not present means user is not logged in and should be redirected to login screen
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<Task />} />
          <Route path="/login" element={<Login />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
