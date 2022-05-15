import React from "react";
import UpsertTask from "./UpsertTask";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import "./TaskModule.css";

const Card = ({ task, changeTaskStatus, type, updateTask, deleteTask }) => {
  const [isEditTaskOpen, setIsEditTaskOpen] = React.useState(false);

  const openModal = () => {
    setIsEditTaskOpen(true);
  };

  const closeModal = () => {
    setIsEditTaskOpen(false);
  };

  return (
    <>
      <div className={`task-card ${type}`}>
        <Tooltip title={task.title} key={task.id + "title"} placement="topLeft">
          <div className="task-title">{task.title}</div>
        </Tooltip>
        <Tooltip
          title={task.description}
          key={task.id + "description"}
          placement="topLeft"
        >
          <div className="task-description">{task.description}</div>
        </Tooltip>
        <div className="action-wrapper">
          <button
            className="change-task-status"
            onClick={() => {
              changeTaskStatus(task);
            }}
          >
            {type === "pending" ? "Mark as Complete" : "Mark as Pending"}
          </button>

          <button className="edit-task-btn" onClick={openModal}>
            Edit
          </button>
          <button
            className="detete-task-btn"
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            Delete
          </button>
        </div>
        <div className="action-btn-wrapper">
          {/* <button
            onClick={() => {
              changeTaskStatus(task);
            }}
          >
            {type === "pending" ? "Mark as Complete" : "Mark as Pending"}
          </button>
        </div> */}
        </div>
      </div>
      {isEditTaskOpen && (
        <UpsertTask
          task={task}
          updateTask={updateTask}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Card;

// for validating prop types
Card.propTypes = {
  task: PropTypes.object,
  changeTaskStatus: PropTypes.func,
  type: PropTypes.string,
  updateTask: PropTypes.func,
  deleteTask: PropTypes.func,
};
