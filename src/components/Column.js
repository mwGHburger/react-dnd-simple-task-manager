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
          <div className="column-header">
            <div className="drag-handle" {...provided.dragHandleProps}>
              <i class="far fa-hand-paper"></i>
            </div>
            <button
              className="delete-column-btn"
              onClick={() => props.handleDeleteColumn(props.column.id)}
            >
              X
            </button>
          </div>
          <h1 className="component-column-title">{props.column.title}</h1>
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
