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

const HomePage: React.FC = () => {
    return (
      <>
        {/* Add Material-UI's CssBaseline to reset CSS */}
        <CssBaseline />
  
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: 8,
            textAlign: 'center',
          }}
        >
          <Container>
            <Typography variant="h2" gutterBottom>
              Welcome to Our Website
            </Typography>
            <Typography variant="h6" gutterBottom>
              We offer great services and awesome features to help you grow.
            </Typography>
            <Button variant="contained" color="secondary" size="large">
              Get Started
            </Button>
          </Container>
        </Box>
  
        {/* Features Section */}
        <Container sx={{ py: 8 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Our Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Feature 1"
                  height="140"
                  image="https://source.unsplash.com/random"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Feature One
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a brief description of feature one. It explains why
                    this feature is amazing and how it can help the user.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
  
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Feature 2"
                  height="140"
                  image="https://source.unsplash.com/random"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Feature Two
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Feature two is another great offering from our product, making
                    your life easier and more productive.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
  
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Feature 3"
                  height="140"
                  image="https://source.unsplash.com/random"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Feature Three
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Our third feature offers yet another valuable tool for your
                    business needs, helping you achieve success.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>

      </>
    );
  };
export default HomePage;