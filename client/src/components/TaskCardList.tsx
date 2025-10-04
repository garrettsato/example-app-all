import React, {useContext, useState} from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    Container,
    Card,
    CardContent,
    Grid2,
    Stack,
    Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline"; // Import the useNavigate hook
import TaskCard from './TaskCard';
import {TasksContext, useTasksContext} from "../providers/TasksProvider";
import {getTaskQuery} from "../services/taskService";
import {useQuery} from "@tanstack/react-query";


type TaskCarListProps = {
    title: string;
    description: string;
}


function TaskCardList() {
    const { tasks, addTask } = useTasksContext();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["tasks"],     // cache key
        queryFn: getTaskQuery,     // promise-returning function
        staleTime: 1000 * 30,    // (optional) consider data fresh for 30s
    });

    if (isLoading) return <p>Loading…</p>;
    if (isError)   return <p>Error</p>;

    return (
        <Paper variant="outlined">
            <Stack spacing={2} sx={{ padding: 5 }}>
            {data.map((task) => (
                <TaskCard title={task.title} description={task.description} />
            ))}

            </Stack>
        </Paper>
    );
}

export default TaskCardList;