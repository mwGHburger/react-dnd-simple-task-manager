import React from "react";
import { Droppable } from "react-beautiful-dnd";
// Import stylesheet
import "../assets/stylesheets/Column.css";
// Import local component
import TaskList from "./TaskList";

const Column = props => {
  return (
    <div className="component-column-container">
      <h1 className="component-column-title">{props.column.title}</h1>
      <Droppable droppableId={props.column.id}>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <TaskList tasks={props.tasks} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
