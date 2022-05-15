import React from "react";
import Card from "./Card";
import "./TaskModule.css";
import { Input } from "antd";

import PropTypes from "prop-types";

const { Search } = Input;

const TaskListContainer = ({ taskList, updateTask, deleteTask, type }) => {
  // filtered tasks according to searchbox text
  const [visibleTasks, setVisibleTasks] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  // should run whenever task-list for the component changes
  // if anything is present in the searchbox, tasks should be automatically filtered according to searchText
  React.useEffect(() => {
    const filteredList = taskList.filter((task) => {
      return (
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setVisibleTasks(filteredList);
  }, [taskList]);

  const changeTaskStatus = (task) => {
    // is task is pending it should be marked as completed
    if (type === "pending") {
      task = { ...task, completed: true };
      updateTask(task);
    }

    // if task is completed is should move to the pending state
    else {
      task = { ...task, completed: false };
      updateTask(task);
    }
  };

  // for managing search
  const onSearch = (value) => {
    setSearchText(value);
    const filteredList = taskList.filter((task) => {
      return (
        task.title.toLowerCase().includes(value.toLowerCase()) ||
        task.description.toLowerCase().includes(value.toLowerCase())
      );
    });
    setVisibleTasks(filteredList);
  };

  return (
    <div className="list-container">
      <div className="conatainer-header">
        <div className={`${type}-container-title`}>
          {type === "pending" ? "Pending Tasks" : "Completed Tasks"}
        </div>
        <div className="search-wrapper">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            onChange={(e) => {
              console.log(e.target.value);
              onSearch(e.target.value);
            }}
            style={{ width: 200 }}
          />
        </div>
      </div>
      <div className="task-conatainer">
        {visibleTasks.map((task) => {
          return (
            <Card
              key={task.id}
              task={task}
              changeTaskStatus={changeTaskStatus}
              type={type}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskListContainer;

// for validating prop-types
TaskListContainer.propTypes = {
  taskList: PropTypes.array,
  updateTask: PropTypes.func,
  deleteTask: PropTypes.func,
  type: PropTypes.string,
};
