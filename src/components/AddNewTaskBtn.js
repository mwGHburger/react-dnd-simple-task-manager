import React from "react";

const AddNewTaskBtn = props => {
  return (
    <form onSubmit={event => props.handleAddTaskSubmit(event, props.column)}>
      {/* TaskId is updated automatically in the background */}
      <input
        className="add-task-input"
        type="text"
        value={
          props.currentColumnInputSecond === props.columnId
            ? props.newTaskPlaceholderContent
            : ""
        }
        onChange={event => props.handleInputSecond(event, props.column)}
      />
      <button className="add-task-btn" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default AddNewTaskBtn;
