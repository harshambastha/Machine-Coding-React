export const kanbanColumns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export const kanbanInitialTasks = {
  todo: [
    { id: "task-1", content: "Design the UI mockups" },
    { id: "task-2", content: "Set up project structure" },
  ],
  "in-progress": [{ id: "task-3", content: "Implement authentication" }],
  done: [{ id: "task-4", content: "Define project requirements" }],
};
