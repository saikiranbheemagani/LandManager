import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Container,
  Grid,
  TextField,
  Paper,
  Button,
  Select,
  MenuItem,
  Modal,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import { AttachMoney, Chat, Person, Phone } from '@mui/icons-material';

import ProjectChatbox from '../components/ProjectChatBox';
import Layout from '../components/Layout';
import { getProjectRequests, getLandmanagers, assignLM, updateProjectDetails } from '../api';
import { useAuth } from '../AuthContext';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const { userRole } = useAuth();
  const [landmanagers, setLandmanagers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editExpectedEndDate, setEditExpectedEndDate] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjectRequests(projectId);
        const project = data.project;
        setProjectDetails(project);
        setEditTitle(project.title);
        setEditDescription(project.description);
        setEditStatus(project.status);
        setEditExpectedEndDate(project.expectedEndDate);
        setEditPrice(project.price);
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    if (userRole === 'ADM') {
      getLandmanagers().then(setLandmanagers);
    }
  }, [projectId, userRole]);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProjectDetails = () => {
    const updatedData = {
      title: editTitle,
      description: editDescription,
      status: editStatus,
      expectedEndDate: editExpectedEndDate,
      price: editPrice,
    };

    updateProjectDetails(projectId, updatedData)
      .then(() => {
        getProjectRequests(projectId).then((data) => setProjectDetails(data.project));
      })
      .catch((error) => {
        console.error('Error updating project details:', error);
      });
  };

  const handleAssign = (lm) => {
    const lm_id = lm._id;
    const lm_name = lm.name;
    const lm_phno = lm.phno;
    const proj_id = projectId;
    assignLM(proj_id, lm_id, lm_name, lm_phno)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error('Error assigning landmanager:', error);
      });
  };

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ marginTop: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h5" mt={2}>
            Loading...
          </Typography>
        </Container>
      </Layout>
    );
  }

  if (!projectDetails) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ marginTop: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Error loading project details.
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
        {/* Project Header */}
        <Typography variant="h4" gutterBottom>
          Project Details
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Project Fields */}
        <Grid container spacing={2} alignItems="center">
          {/* Title */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Title:
            </Typography>
            {userRole === 'ADM' ? (
              <TextField
                fullWidth
                variant="outlined"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <Typography gutterBottom>{projectDetails.title}</Typography>
            )}
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Description:
            </Typography>
            {userRole === 'ADM' ? (
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            ) : (
              <Typography gutterBottom>{projectDetails.description}</Typography>
            )}
          </Grid>

          {/* Price */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Price:
            </Typography>
            {userRole === 'ADM' ? (
              <TextField
                fullWidth
                variant="outlined"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            ) : (
              <Typography gutterBottom>{projectDetails.price}</Typography>
            )}
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Status:
            </Typography>
            {userRole === 'ADM' ? (
              <Select fullWidth value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
                <MenuItem value="inprogress">In Progress</MenuItem>
              </Select>
            ) : (
              <Typography gutterBottom>{projectDetails.status}</Typography>
            )}
          </Grid>

          {/* Admin Actions */}
          {userRole === 'ADM' && (
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={handleUpdateProjectDetails}>
                Update Project
              </Button>
              <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }} onClick={handleOpen}>
                Assign Landmanager
              </Button>
            </Grid>
          )}
        </Grid>

        {/* Chatbox Component */}
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Chatbox
          </Typography>
          <ProjectChatbox projectId={projectId} userRole={userRole} proj_title={projectDetails.title} />
        </Paper>

        {/* Landmanager Modal */}
        <Modal open={isModalOpen} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              outline: 'none',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Select a Landmanager
            </Typography>
            <List>
              {landmanagers.map((lm) => (
                <ListItem button key={lm._id} onClick={() => handleAssign(lm)}>
                  <ListItemText primary={lm.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>
      </Container>
    </Layout>
  );
};

export default ProjectDetailsPage;




