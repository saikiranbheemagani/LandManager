import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  CssBaseline,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../AuthContext';
import { getProjectRequests, getAssets } from '../api';

function UserDashboard() {
  const { authenticated } = useAuth();
  const [projectRequests,   setProjectRequests] = useState([]);
  const [assets, setAssets] = useState([]);
  const { userRole } = useAuth();

  useEffect(() => {
    // Fetch ProjectRequests from the backend
    getProjectRequests()
      .then((data) => {
        setProjectRequests(data.projects);
      })
      .catch((error) => {
        console.error('Error fetching Project Request:', error);
      });
      
      // Fetch assets from the backend only when userRole is 'ADM' or 'CSM'
      if (userRole !== 'LM') {
        getAssets()
        .then((data) => {
          setAssets(data.data);
          console.log(assets)

        })
        .catch((error) => {
          console.error('Error fetching assets:', error);
        });
    }
  }, [userRole]);

  return (
    <div>
      <CssBaseline />
      {authenticated ? (
        <Layout>
          <Container style={{ minHeight: 'calc(100vh - 64px)', paddingBottom: '20px' }}>
            <Grid container spacing={3}>
              {/* Asset Section */}
              {(userRole === 'ADM' || userRole === 'CSM') && (
                <Grid item xs={12} data-cy="assets">
                  <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h4">My Assets</Typography>
                    <Typography variant="h6">Total Assets: {assets.length}</Typography>
                    <Grid container spacing={2}>
                      {assets.map((asset) => (
                        <Grid item key={asset._id} xs={12} sm={6} md={4} lg={3}>
                          <Card >
                            <CardContent>
                              <Typography variant="h6">{asset.name}</Typography>
                              <Typography variant="body2">{asset.description}</Typography>
                              <Typography variant="caption">
                                {`${asset.location.city}, ${asset.location.district}`}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
              )}

              {/* Project Section */}
              <Grid item xs={12} data-cy="project-requests">
                <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
                  <Typography variant="h4">My Projects</Typography>
                  <Typography variant="h6">Total Projects: {projectRequests.length}</Typography>
                  <Grid container spacing={2}>
                    {projectRequests.map((projectrequest) => (
                      <Grid item key={projectrequest._id} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/user/projects/${projectrequest._id}`}>
                          <Card>
                            <CardContent>
                              <Typography variant="h6">{projectrequest.title}</Typography>
                              <Typography variant="subtitle2">{projectrequest.uid}</Typography>
                              <Typography variant="caption">Status: {projectrequest.status}</Typography>
                            </CardContent>
                          </Card>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>

              {/* Register Button for Admin */}
              {userRole === 'ADM' && (
                <Grid item xs={12} style={{ marginTop: '16px', marginBottom: '20px' }}>
                  <Link to="/admin/register">
                    <Button variant="contained" color="primary">
                      Register Admin
                    </Button>
                  </Link>
                </Grid>
              )}
            </Grid>
          </Container>
        </Layout>
      ) : (
        <div>
          <p>You are not authenticated. Please complete the registration process.</p>
          <a href="/">Go to Registration</a>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;

