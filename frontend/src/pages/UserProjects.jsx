import React, { useState } from 'react';
import ProjectRequestList from '../components/ProjectRequestList';
import AddProjectRequestForm from '../components/AddProjectRequestForm';
import { Button, Typography, Grid } from '@mui/material';
import Layout from '../components/Layout';

const Assets = () => {
  const [isAddProjectRequestFormOpen, setAddProjectRequestFormOpen] = useState(false);

  const handleProjectRequestAdded = (newProjectRequest) => {
    // Implement logic to update the asset list (e.g., fetch the updated list from the backend)
    console.log('Project Request added:', newProjectRequest);
    setAddProjectRequestFormOpen(false);
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Project Management</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => setAddProjectRequestFormOpen(true)}
            variant="contained"
            color="primary"
          >
            Add ProjectRequest
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ProjectRequestList />
        </Grid>
      </Grid>

      <AddProjectRequestForm
        open={isAddProjectRequestFormOpen}
        onClose={() => setAddProjectRequestFormOpen(false)}
        onAssetAdded={handleProjectRequestAdded}
      />
    </Layout>
  );
};

export default Assets;