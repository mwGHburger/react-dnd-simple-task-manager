import React from "react";
// import stylesheet
import "../assets/stylesheets/TaskList.css";
// import local component
import Task from "./Task";

const TaskList = props => {
  return (
    <div className="component-tasklist-container">
      {props.tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          handleDeleteTask={props.handleDeleteTask}
          columnId={props.columnId}
        />
      ))}
    </div>
  );
};

export default TaskList;
