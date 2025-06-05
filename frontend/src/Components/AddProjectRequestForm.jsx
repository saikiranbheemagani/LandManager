import React, { useState, useEffect } from 'react';
import Data from '../Data/Services';
import PropTypes from 'prop-types';
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
import { addProjectRequest, getAssets } from '../api'; // Adjust the path accordingly

const AddProjectRequestForm = ({ open, onClose, onProjectRequestAdded }) => {
  const [projectrequestData, setProjectRequestData] = useState({
    assetID: '',
    title: '',
    description: '',
    category: ''
  });

  const [assets, setAssets] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch assets from the backend
    getAssets()
      .then((data) => {
        setAssets(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.error('Error fetching assets:', error);
      });
  }, []);

  const handleAssetIDChange = (e) => {
    const selectedAssetID = e.target.value;
    setProjectRequestData({ ...projectrequestData, assetID: selectedAssetID });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!projectrequestData.assetID.trim()) {
      newErrors.assetID = 'assetID is required';
    }
    // Add more validation for other fields as needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log(projectrequestData);
    try {
      if (validateForm()) {
        const response = await addProjectRequest(projectrequestData);
        
        onClose();
        onProjectRequestAdded(response);
      }
    } catch (error) {
      console.error('Error adding projectrequest:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Project Request</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Select
            label="AssetID"
            name="assetID"
            value={projectrequestData.assetID}
            onChange={handleAssetIDChange}
            fullWidth
            error={!!errors.assetID}
            helperText={errors.assetID}
          >
            {assets.map((asset) => (
              <MenuItem key={asset._id} value={asset._id}>
                {asset.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ p: 2 }}>
          <Select
            label="Title"
            name="title"
            value={projectrequestData.title}
            onChange={handleChange}
            fullWidth
            error={!!errors.title}
            helperText={errors.title}
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
            value={projectrequestData.description}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            label="Category"
            name="category"
            value={projectrequestData.category}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Project Request</Button>
      </DialogActions>
    </Dialog>
  );
};

AddProjectRequestForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onProjectRequestAdded: PropTypes.func.isRequired,
};

export default AddProjectRequestForm;
