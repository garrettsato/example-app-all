import React, { useState } from 'react';
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
    Paper, TextareaAutosize
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline"; // Import the useNavigate hook
import TaskCardList from '../components/TaskCardList';
import {Task} from "@mui/icons-material";
import {TasksContextProvider} from "../providers/TasksProvider";
import {useTasksContext} from "../providers/TasksProvider";
import {useMutation, useQueryClient} from "@tanstack/react-query";


// Validation for the form fields
const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
};

const validatePassword = (password: string) => {
    return password.length >= 6;
};

const TaskPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [apiError, setApiError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate(); // Initialize the navigate hook
    const { tasks, addTask } = useTasksContext();
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error, reset } = useMutation({
        mutationFn: async (task: any) => {
            return task;
        },
        onSuccess: (newTask) => {
            queryClient.setQueryData<any>(["tasks"], (old = []) => [...old, newTask]);
        }
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addTask({ title, description });
        mutate({ title: title, description: description});
    };

    return (
        <Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '400px',
                    margin: 'auto',
                    padding: 2,
                    gap: 2,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" textAlign="center" gutterBottom>
                    Login
                </Typography>

                {/* API Error Alert */}
                {apiError && <Alert severity="error">{apiError}</Alert>}

                {/* Success Message Alert */}
                {successMessage && <Alert severity="success">{successMessage}</Alert>}

                <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                />

                <TextField
                    label="Description"
                    multiline
                    minRows={4}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    required
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create Task
                </Button>
            </Box>

            <CssBaseline />
            <Grid2
                container
                spacing = {8}
                columns = {3}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
            <TaskCardList />

            <TaskCardList />

            <TaskCardList />



            </Grid2>
        </Box>
    );
};

export default TaskPage;