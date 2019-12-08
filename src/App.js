import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {stateArchitecture.columnOrder.map(columnId => {
        // pull column out of state
        const column = stateArchitecture.columns[columnId];
        // pull tasks associated with respective column out of state
        const tasks = column.taskIds.map(taskId => {
          return stateArchitecture.tasks[taskId];
        });
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}

export default App;
