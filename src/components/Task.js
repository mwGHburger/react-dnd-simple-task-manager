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
          {props.task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
