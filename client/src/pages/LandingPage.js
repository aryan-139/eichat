import React from 'react';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles'; // Import styled from @mui/material/styles

const RootContainer = styled('div')({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
});

const PaperContainer = styled(Paper)({
  padding: '32px',
  textAlign: 'center',
  color: '#333',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
});

const LandingPage = () => {
  return (
    <RootContainer>
      <Container maxWidth="sm">
        <PaperContainer>
          <Typography variant="h4" gutterBottom>
            Welcome to Your App
          </Typography>
          <Typography variant="body1" paragraph>
            Explore the amazing features of our app.
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                fullWidth
                sx={{ mt: 2, mb: 1.5 }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/register"
                fullWidth
                sx={{ mt: 2, mb: 1.5 }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </PaperContainer>
      </Container>
    </RootContainer>
  );
};

export default LandingPage;
