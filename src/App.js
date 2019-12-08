import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./App.css";
// import state data
import initialStateData from "./InitialData";

// import local components
import Column from "./components/Column";

// import bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

function App() {
  // initiliaze state
  const [stateArchitecture, setStateArchitecture] = useState(initialStateData);
  const [newTaskPlaceholder, setNewTaskPlaceholder] = useState({
    id: "",
    content: ""
  });
  // Initialized to ensure each form is unique
  const [currentColumnInputFirst, setCurrentColumnInputFirst] = useState("");
  const [currentColumnInputSecond, setCurrentColumnInputSecond] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  // functions

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const handleInputFirst = (event, column) => {
    console.log(event);
    console.log(column);
    setCurrentColumnInputFirst(column.id);
    setNewTaskPlaceholder({ ...newTaskPlaceholder, id: event.target.value });
  };

  const handleInputSecond = (event, column) => {
    setCurrentColumnInputSecond(column.id);
    setNewTaskPlaceholder({
      ...newTaskPlaceholder,
      content: event.target.value
    });
  };

  const handleAddTaskSubmit = (event, column) => {
    event.preventDefault();
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
                  {/* Modal */}
                  <ButtonToolbar>
                    <Button
                      variant="primary"
                      onClick={() => setModalShow(true)}
                    >
                      Add New Task
                    </Button>

                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </ButtonToolbar>
                  {/* Modal */}
                  <form onSubmit={event => handleAddTaskSubmit(event, column)}>
                    <label>TaskId</label>
                    <input
                      type="text"
                      value={
                        currentColumnInputFirst === columnId
                          ? newTaskPlaceholder.id
                          : ""
                      }
                      onChange={event => handleInputFirst(event, column)}
                    />
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
                    <button>Add Task</button>
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
