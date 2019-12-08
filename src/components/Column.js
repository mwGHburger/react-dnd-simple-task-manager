import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
// Import stylesheet
import "../assets/stylesheets/Column.css";
// Import local component
import TaskList from "./TaskList";

const Column = props => {
  return (
    <Draggable draggableId={props.column.id} index={props.columnIndex}>
      {provided => (
        <div
          className="component-column-container"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h1 className="component-column-title" {...provided.dragHandleProps}>
            {props.column.title}
          </h1>
          <Droppable droppableId={props.column.id} type="task">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <TaskList tasks={props.tasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
