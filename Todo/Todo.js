import "./Todo.css";
import { useState, useEffect } from "react";

import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import { getLocalStorageTodoData, setLocalStorageTodoData } from "./TodoLocalStorage";

export const Todo = () => {
    // Initialize task state with data from local storage
    const [task, setTask] = useState(() => getLocalStorageTodoData());

    // Update local storage whenever the `task` state changes
    useEffect(() => {
        setLocalStorageTodoData(task);
    }, [task]);

    const handleFormSubmit = (inputValue) => {
        const { id, content, checked = false } = inputValue;

        if (!content) return;

        // Check for duplicate tasks
        const ifTodoContentMatched = task.find(
            (curTask) => curTask.content === content
        );
        if (ifTodoContentMatched) return;

        // Add new task
        setTask((prevTask) => [...prevTask, { id, content, checked }]);
    };

    const handleDeleteTodo = (value) => {
        const updatedTask = task.filter((curTask) => curTask.content !== value);
        setTask(updatedTask);
    };

    const handleClearToDoData = () => {
        setTask([]);
    };

    const handleCheckedTodo = (content) => {
        const updatedTask = task.map((curTask) => {
            if (curTask.content === content) {
                return { ...curTask, checked: !curTask.checked };
            } else {
                return curTask;
            }
        });
        setTask(updatedTask);
    };

    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <TodoDate />
            </header>

            <TodoForm onAddTodo={handleFormSubmit} />

            <section className="myUnOrdList">
                <ul>
                    {task.map((curTask) => (
                        <TodoList
                            key={curTask.id}
                            data={curTask.content}
                            checked={curTask.checked}
                            onHandleDeleteTodo={handleDeleteTodo}
                            onHandleCheckedTodo={handleCheckedTodo}
                        />
                    ))}
                </ul>
            </section>

            <section>
                <button className="clear-btn" onClick={handleClearToDoData}>
                    Clear All
                </button>
            </section>
        </section>
    );
};
