const todoKey = "reactTodo";

export const getLocalStorageTodoData = () => {
    const rawTodos = localStorage.getItem(todoKey);
    if (!rawTodos) return [];
    try {
        return JSON.parse(rawTodos);
    } catch (error) {
        console.error("Error parsing local storage data:", error);
        return [];
    }
};

export const setLocalStorageTodoData = (task) => {
    localStorage.setItem(todoKey, JSON.stringify(task));
};
