const initialStateData = {
  tasks: {
    "task-1": { id: "task-1", content: "Content 1" },
    "task-2": { id: "task-2", content: "Content 2" },
    "task-3": { id: "task-3", content: "Content 3" },
    "task-4": { id: "task-3", content: "Content 4" },
    "task-5": { id: "task-3", content: "Content 5" },
    "task-6": { id: "task-3", content: "Content 6" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "First Column",
      // Ensures ownership and order of the task
      taskIds: ["task-1", "task-2", "task-3"]
    },
    "column-2": {
      id: "column-2",
      title: "Second Column",
      // Ensures ownership and order of the task
      taskIds: ["task-4", "task-5", "task-6"]
    }
  },
  // Allows the reordering of the columns
  columnOrder: ["column-1"]
};

export default initialStateData;
