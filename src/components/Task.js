import React from "react";
import { Draggable } from "react-beautiful-dnd";

//import stylesheet
import "../assets/stylesheets/Task.css";

const Task = props => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className="component-task-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{props.task.content}</p>
          <button
            className="delete-task-btn"
            onClick={() =>
              props.handleDeleteTask(props.task.id, props.columnId)
            }
          >
            X
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
