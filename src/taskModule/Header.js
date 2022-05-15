import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import UpsertTask from "./UpsertTask";
import PropTypes from "prop-types";
import "./TaskModule.css";

const Header = ({ addTask }) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = React.useState(false);

  const closeModal = () => {
    setIsAddTaskOpen(false);
  };

  const addTaskToDB = (task) => {
    closeModal();
    addTask(task);
  };

  return (
    <>
      <div className="header-main">
        <div className="header-title">Task World</div>

        <div
          className="add-task-btn"
          onClick={() => {
            setIsAddTaskOpen(true);
          }}
        >
          <PlusOutlined /> Add Task
        </div>
      </div>
      {isAddTaskOpen && (
        <UpsertTask closeModal={closeModal} addTask={addTaskToDB} />
      )}
    </>
  );
};

export default Header;

Header.propTypes = {
  addTask: PropTypes.func,
};
