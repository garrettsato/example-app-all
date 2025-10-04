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
    Paper, CardHeader
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline"; // Import the useNavigate hook

type TaskCardProps = {
    title: string;
    description: string;
}

function TaskCard({ title, description }: TaskCardProps) {
    return (

        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" color="text.secondary">
                    {title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>

    );
}

export default TaskCard;