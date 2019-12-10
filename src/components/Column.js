import React, { useState } from "react";
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
          <button onClick={() => props.handleDeleteColumn(props.column.id)}>
            Delete Column
          </button>
          <h1 className="component-column-title" {...provided.dragHandleProps}>
            {props.column.title}
          </h1>
          {props.children}
          <Droppable droppableId={props.column.id} type="task">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <TaskList
                  tasks={props.tasks}
                  handleDeleteTask={props.handleDeleteTask}
                  columnId={props.column.id}
                />
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
