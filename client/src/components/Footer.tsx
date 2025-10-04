import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CssBaseline,
} from '@mui/material';

const AppFooter = () => {
    return (
        <Box
            sx={{
            bgcolor: 'primary.dark',
            color: 'white',
            py: 4,
            mt: 8,
            textAlign: 'center',
            }}
            >
            <Container>
            <Typography variant="h6" gutterBottom>
                Contact Us
            </Typography>
            <Typography variant="body1">
                Email: contact@mywebsite.com | Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
                &copy; {new Date().getFullYear()} My Website. All rights reserved.
            </Typography>
            </Container>
        </Box>
    )
}

export default AppFooter;