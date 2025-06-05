import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { addAsset } from '../api'; // Adjust the path accordingly

const AddAssetForm = ({ open, onClose, onAssetAdded }) => {
  const [assetData, setAssetData] = useState({
    name: '',
    description: '',
    location: {
      city: '',
      district: '',
      pincode: '',
      surveycode: '',
      landmarks: '',
      locationLink: '',
    },
    media: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setAssetData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  // const handleMediaChange = (e) => {
  //   const files = e.target.files;
  //   setAssetData((prevData) => ({
  //     ...prevData,
  //     media: [...prevData.media, ...files],
  //   }));
  // };

  const handleRemoveMedia = (index) => {
    setAssetData((prevData) => {
      const newMedia = [...prevData.media];
      newMedia.splice(index, 1);
      return { ...prevData, media: newMedia };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!assetData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    // Add more validation for other fields as needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (validateForm()) {
        const response = await addAsset(assetData);

        onClose();
        onAssetAdded(response);
      }
    } catch (error) {
      console.error('Error adding asset:', error);
    }
  };

  const handleUploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 's7cf8bgq'); 
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dhcc6kt1u/image/upload`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      return data.secure_url; // URL of the uploaded image
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
    }
  };

  const handleMediaChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map(handleUploadToCloudinary);
  
    try {
      const imageUrls = await Promise.all(uploadPromises);
      setAssetData((prevData) => ({
        ...prevData,
        media: [...prevData.media, ...imageUrls.filter(url => !!url)],
      }));
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Asset</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={assetData.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            label="Description"
            name="description"
            value={assetData.description}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Location
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="City"
              name="city"
              value={assetData.location.city}
              onChange={handleLocationChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="District"
              name="district"
              value={assetData.location.district}
              onChange={handleLocationChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Pincode"
              name="pincode"
              value={assetData.location.pincode}
              onChange={handleLocationChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Survey Code"
              name="surveycode"
              value={assetData.location.surveycode}
              onChange={handleLocationChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Landmarks"
              name="landmarks"
              value={assetData.location.landmarks}
              onChange={handleLocationChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Location Link"
              name="locationLink"
              value={assetData.location.locationLink}
              onChange={handleLocationChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Media
        </Typography>
        <Box sx={{ p: 2 }}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleMediaChange}
            style={{ display: 'none' }}
            id="media-input"
          />
          <label htmlFor="media-input">
            <Button
              variant="contained"
              component="span"
              startIcon={<PhotoCamera />}
            >
              Add Media
            </Button>
          </label>
          <div>
  {assetData.media.map((url, index) => (
    <div key={index}>
      <img src={url} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
      <IconButton onClick={() => handleRemoveMedia(index)}>
        <i className="material-icons">delete</i>
      </IconButton>
    </div>
  ))}
</div>

        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Asset</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAssetForm;
