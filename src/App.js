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
  // required for add new task functionality
  const [prefixUniqueNo, setPrefixUniqueNo] = useState({
    // Ensure there is no duplication of unique Ids
    uniqueNumber: 7,
    prefix: "task-"
  });
  const [newTaskPlaceholder, setNewTaskPlaceholder] = useState({
    id: `${prefixUniqueNo.prefix}${prefixUniqueNo.uniqueNumber}`,
    content: ""
  });
  // Initialized to ensure each form is unique
  // const [currentColumnInputFirst, setCurrentColumnInputFirst] = useState("");
  const [currentColumnInputSecond, setCurrentColumnInputSecond] = useState("");

  // functions
  // TODO: Delete this logic, we no longer require manual user input for taskId
  // const handleInputFirst = (event, column) => {
  //   console.log(event);
  //   console.log(column);
  //   setCurrentColumnInputFirst(column.id);
  //   setNewTaskPlaceholder({ ...newTaskPlaceholder, id: event.target.value });
  // };

  // Generate unqiue taskId

  const handleInputSecond = (event, column) => {
    setCurrentColumnInputSecond(column.id);
    setNewTaskPlaceholder({
      ...newTaskPlaceholder,
      content: event.target.value
    });
  };

  const createNewTaskId = () => {
    const newPrefixUniqueNo = {
      ...prefixUniqueNo,
      uniqueNumber: prefixUniqueNo.uniqueNumber + 1
    };
    // Update
    setPrefixUniqueNo(newPrefixUniqueNo);
    const newTaskId = `${newPrefixUniqueNo.prefix}${newPrefixUniqueNo.uniqueNumber}`;
    const updatedNewPlaceholder = { ...newTaskPlaceholder, id: newTaskId };
    setNewTaskPlaceholder(updatedNewPlaceholder);
    // although this aims to update the taskId, it is too slow to be executed during the handleAddTaskSubmit function so it lags behind 1 id.
    // Therefore, the first new Id created will be id that is initially in the newTaskPlaceholder
    // I have tried using callback functions/promises to overcome this but to no avail
    // It works now but would like to polish it
  };

  const handleAddTaskSubmit = (event, column) => {
    event.preventDefault();
    createNewTaskId();
    console.log("submit");
    // Need logic to add form data to tasks object
    const newTasks = stateArchitecture.tasks;
    newTasks[newTaskPlaceholder.id] = newTaskPlaceholder;
    console.log("newTasks");
    console.log(newTasks);
    // Need to add task in column's taskIds array
    const newColumnOrder = stateArchitecture.columns[column.id].taskIds;
    newColumnOrder.push(newTaskPlaceholder.id);
    console.log("newColumnOrder");
    console.log(newColumnOrder);
    // Copy columns and update changes
    const newColumns = stateArchitecture.columns;
    // Copy state and update
    const newState = { ...stateArchitecture, columns: newColumns };
    console.log("newState");
    console.log(newState);
    //update state
    setStateArchitecture(newState);
    return;
  };

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
                >
                  {/* Add task function start */}
                  <form onSubmit={event => handleAddTaskSubmit(event, column)}>
                    {/* TaskId is updated automatically in the background */}
                    <label>Content</label>
                    <input
                      type="text"
                      value={
                        currentColumnInputSecond === columnId
                          ? newTaskPlaceholder.content
                          : ""
                      }
                      onChange={event => handleInputSecond(event, column)}
                    />
                    <button type="submit">Add Task</button>
                  </form>
                  {/* Add task function end */}
                </Column>
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
