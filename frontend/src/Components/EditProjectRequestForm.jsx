import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Data from '../Data/Services';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { updateProjectRequest, getAssets } from '../api'; // Adjust the path accordingly


const EditProjectRequestForm = ({ open, onClose, projectrequest, onProjectRequestUpdated }) => {
  console.log(projectrequest);
  const [editedProjectRequest, setEditedProjectRequest] = useState({
    assetID: projectrequest.asset_id || '',
    title: projectrequest.title || '',
    description: projectrequest.description || '',
    category: projectrequest.category || '',
  });

  const [assets, setAssets] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch assets from the backend
    getAssets()
      .then((data) => {
        setAssets(data.data);
      })
      .catch((error) => {
        console.error('Error fetching assets:', error);
      });
  }, []);

  useEffect(() => {
    setEditedProjectRequest({
      assetID: projectrequest.assetID || '',
      title: projectrequest.title || '',
      description: projectrequest.description || '',
      category: projectrequest.category || '',
    });
  }, [projectrequest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProjectRequest((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await updateProjectRequest({ ...editedProjectRequest, id: projectrequest._id });
      onProjectRequestUpdated(response.data);
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error updating Project Request:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Project Request</DialogTitle>
      <DialogContent>
      <Box sx={{ p: 2 }}>
          <TextField
            label="AssetID"
            name="assetID"
            value={editedProjectRequest.assetID}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <Select
            label="Title"
            name="title"
            value={editedProjectRequest.title}
            onChange={handleChange}
            fullWidth
          >
            {Data.map((service) => (
              <MenuItem key={service.id} value={service.name}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        
        <Box sx={{ p: 2 }}>
          <TextField
            label="Description"
            name="description"
            value={editedProjectRequest.description}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            label="Category"
            name="category"
            value={editedProjectRequest.category}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditProjectRequestForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  projectrequest: PropTypes.object.isRequired,
  onProjectRequestUpdated: PropTypes.func.isRequired,
};

export default EditProjectRequestForm;
