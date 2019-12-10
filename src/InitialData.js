const initialStateData = {
  tasks: {
    "task-1": { id: "task-1", content: "x12 Oranges" },
    "task-2": { id: "task-2", content: "Bread" },
    "task-3": { id: "task-3", content: "Free Range Eggs" },
    "task-4": { id: "task-4", content: "Eat" },
    "task-5": { id: "task-5", content: "Sleep" },
    "task-6": { id: "task-6", content: "Code" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Shopping List",
      // Ensures ownership and order of the task
      taskIds: ["task-1", "task-2", "task-3"]
    },
    "column-2": {
      id: "column-2",
      title: "My ToDo",
      // Ensures ownership and order of the task
      taskIds: ["task-4", "task-5", "task-6"]
    }
  },
  // Allows the reordering of the columns
  columnOrder: ["column-1", "column-2"]
};

export default initialStateData;
