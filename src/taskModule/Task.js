import React from "react";

import { DBConfig } from "./DBConfig";
import { initDB } from "react-indexed-db";
import { useIndexedDB } from "react-indexed-db";

import Header from "./Header";
import TaskListContainer from "./TaskListContainer";
import { useNavigate } from "react-router-dom";
import "./TaskModule.css";

initDB(DBConfig);

const Task = () => {
  let navigate = useNavigate();
  const [taskList, setTaskList] = React.useState([]);
  const [pendingTaskList, setPendingTaskList] = React.useState([]);
  const [completedTaskList, setCompletedTaskList] = React.useState([]);

  //indexDB in-built methods for adding, updating, reading and deleting data
  const { add, update, getAll, deleteRecord } = useIndexedDB("task");

  React.useEffect(() => {
    // fetching auth token from session storage
    let authToken = sessionStorage.getItem("Auth Token");

    // if auth token is not present means user is not logged in and should be redirected to login screen
    if (!authToken) {
      navigate("/login");
    }

    // if user is logged in task should be fetched from indexedDB
    else {
      refreshTaskList();
    }
  }, []);

  // for fetching latest data from indexedDB whenever required
  const refreshTaskList = () => {
    getAll().then((tasksFromDB) => {
      setTaskList(tasksFromDB);
      setPendingTaskList(
        tasksFromDB.filter((task) => task.completed === false)
      );
      setCompletedTaskList(
        tasksFromDB.filter((task) => task.completed === true)
      );
    });
  };

  // for adding task in indexedDB
  const addTask = (task) => {
    console.log(task);
    add(task).then(
      (event) => {
        console.log("ID Generated: ", event.target);
        refreshTaskList();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // for updating task in indexedDB
  const updateTask = (task) => {
    update(task).then(() => {
      refreshTaskList();
    });
  };

  // for deleting task from indexedDB
  const deleteTask = (id) => {
    deleteRecord(id).then(() => {
      refreshTaskList();
    });
  };

  return (
    <div className="task-module-main">
      <Header addTask={addTask} />
      <div className="section-1">
        <div className="task-count-wrapper">
          <div className="task-count-card total">
            <div className="title">Total Task</div>
            <div className="task-count">{taskList.length}</div>
          </div>
          <div className="task-count-card pending">
            <div className="title">Pending Task</div>
            <div className="task-count">{pendingTaskList.length}</div>
          </div>
          <div className="task-count-card completed">
            <div className="title">Completed Task</div>
            <div className="task-count">{completedTaskList.length}</div>
          </div>
        </div>
      </div>

      {/* pending task list component */}
      <TaskListContainer
        taskList={pendingTaskList}
        updateTask={updateTask}
        deleteTask={deleteTask}
        type={"pending"}
      />

      {/* completed task list component */}
      <TaskListContainer
        taskList={completedTaskList}
        updateTask={updateTask}
        deleteTask={deleteTask}
        type={"completed"}
      />
    </div>
  );
};

export default Task;
