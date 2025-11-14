const STORAGE_KEY = 'tasks';

export const getTasks = () => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const addTask = (task) => {
  const tasks = getTasks();
  const newTask = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...task
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTask = (id, updatedTask) => {
  const tasks = getTasks();
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    saveTasks(tasks);
    return tasks[index];
  }
  return null;
};

export const deleteTask = (id) => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.id !== id);
  saveTasks(filteredTasks);
  return filteredTasks;
};

export const getTaskById = (id) => {
  const tasks = getTasks();
  return tasks.find(task => task.id === id) || null;
};