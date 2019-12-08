import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./App.css";
// import state data
import initialStateData from "./InitialData";

// import local components
import Column from "./components/Column";

function App() {
  // initiliaze state
  const [stateArchitecture, setStateArchitecture] = useState(initialStateData);

  // functions
  const onDragEnd = result => {
    //TODO: Reorder our column
    const { destination, source, draggableId, type } = result;

    // Do not do anything if there is no destination
    if (!destination) {
      return;
    }
    // Do not do anything if the draggable item has been dropped back to its source location
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // write logic to reorder columns
    if (type === "column") {
      // create copy of columnOrder array
      const newColumnOrder = stateArchitecture.columnOrder;

      // update copy
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      // update state
      const newState = { ...stateArchitecture, columnOrder: newColumnOrder };
      setStateArchitecture(newState);
      // return is important to stop the function from continuing
      return;
    }

    // Need to reorder the taskIds column in the state
    const start_column = stateArchitecture.columns[source.droppableId];
    const finish_column = stateArchitecture.columns[destination.droppableId];

    if (start_column === finish_column) {
      // create new taskIds array that is a copy of taskIds array that we want to change
      const newTaskIds = start_column.taskIds;
      // 1. Change the taskIds array
      // From this index, remove one item
      newTaskIds.splice(source.index, 1);
      // From this index, remove nothing, insert draggableId
      newTaskIds.splice(destination.index, 0, draggableId);
      // 2. Change the Column's props to accomodate change in taskIds array
      const newColumn = { ...start_column, taskIds: newTaskIds };
      // 3. Change state data to accomodate change in the column
      const newState = {
        ...stateArchitecture,
        columns: { ...stateArchitecture.columns, [newColumn.id]: newColumn }
      };
      setStateArchitecture(newState);
      // return is important to stop the function from continuing
      return;
    }

    if (start_column !== finish_column) {
      // Make copy of taskIds array from source
      const newStartTaskIds = start_column.taskIds.map(task => task);
      // Make copy of taskIds array from destination
      const newFinishTaskIds = finish_column.taskIds.map(task => task);

      // Adjust taskIds array from source for change
      newStartTaskIds.splice(source.index, 1);
      // Adjust taskIds array from destination for change
      newFinishTaskIds.splice(destination.index, 0, draggableId);

      // Update source column for change in taskIds array
      const newColumnStart = { ...start_column, taskIds: newStartTaskIds };
      // Update destination column for change in taskIds array
      const newColumnFinish = { ...finish_column, taskIds: newFinishTaskIds };

      // Create copy of state data and adjust for changes in columns
      const newState = {
        ...stateArchitecture,
        columns: {
          ...stateArchitecture.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish
        }
      };
      // Update state data with changes
      setStateArchitecture(newState);
      // return is important to stop the function from continuing
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="All-Columns" direction="horizontal" type="column">
        {provided => (
          <div
            className="component-app-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {stateArchitecture.columnOrder.map((columnId, index) => {
              // pull column out of state
              const column = stateArchitecture.columns[columnId];
              // pull tasks associated with respective column out of state
              const tasks = column.taskIds.map(taskId => {
                return stateArchitecture.tasks[taskId];
              });
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  columnIndex={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
