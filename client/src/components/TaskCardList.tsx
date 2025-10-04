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


type TaskCarListProps = {
    title: string;
    description: string;
}


function TaskCardList() {
    const { tasks, addTask } = useTasksContext();

    return (
        <Paper variant="outlined">
            <Stack spacing={2} sx={{ padding: 5 }}>
            {tasks.map((task) => (
                <TaskCard title={task.title} description={task.description} />
            ))}

            </Stack>
        </Paper>
    );
}

export default TaskCardList;