import React, {createContext, useContext, useState, useEffect, useMemo} from 'react';
import {getTasks} from "../services/taskService";

export type Task = {
    title: string,
    description: string,
}

type TasksContextType = {
    tasks: Task[] | null;
    addTask: (task: Task) => void;
}

// Create the context
export const TasksContext = createContext<TasksContextType | null>(null);

// Custom hook to use auth context

export const TasksContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(
        [
            { title: 'Task 1', description: 'Description 1' },
            { title: 'Task 2', description: 'Description 2' },
            { title: 'Task 3', description: 'Description 3' }
        ]
    );
    const addTask = (task: Task) => {
        setTasks(prev => [...prev, task]);
    }

    useEffect(() => {
        async function load() {
            const tasks = await getTasks();
            setTasks(tasks);
        }
        load();
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, addTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export function useTasksContext(): TasksContextType {
    return useContext(TasksContext);
}
