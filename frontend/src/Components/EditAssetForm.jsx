import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material';
import { updateAsset } from '../api';

const EditAssetForm = ({ open, onClose, asset, onAssetUpdated }) => {
  const [editedAsset, setEditedAsset] = useState(asset || {});

  useEffect(() => {
    setEditedAsset(asset || {});
  }, [asset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAsset((prevAsset) => ({
      ...prevAsset,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await updateAsset({ ...editedAsset, id: editedAsset._id });
      onAssetUpdated(response.data);
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error updating asset:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Asset</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={editedAsset.name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={editedAsset.description || ''}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Typography variant="h6">Location</Typography>
        <TextField
          label="City"
          name="location.city"
          value={editedAsset.location?.city || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="District"
          name="location.district"
          value={editedAsset.location?.district || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Pincode"
          name="location.pincode"
          value={editedAsset.location?.pincode || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="SurveyCode"
          name="location.surveycode"
          value={editedAsset.location?.surveycode || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Landmark"
          name="location.landmark"
          value={editedAsset.location?.landmark || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location Link"
          name="location.locationLink"
          value={editedAsset.location?.locationLink || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Add other location fields as needed */}
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

export default EditAssetForm;
