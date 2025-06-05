import React, { useState, useEffect } from 'react';
import { Typography, Container, Divider, Box, TextField, CircularProgress } from '@mui/material';
import { LocationOn, Description, Room, PinDrop, Code, Link, Photo } from '@mui/icons-material';
import { getAssets } from '../api';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const AssetDetailsPage = () => {
  const { assetId } = useParams();
  const [assetDetails, setAssetDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAssets(assetId);
        const matchedAsset = data.data.find((asset) => asset._id === assetId);

        if (matchedAsset) {
          setAssetDetails(matchedAsset);
        } else {
          console.error('No asset found with the given assetId');
        }
      } catch (error) {
        console.error('Error fetching asset details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [assetId]);

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

  if (!assetDetails) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ marginTop: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Error loading asset details.
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Asset Details
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Name */}
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" sx={{ flexBasis: '30%' }}>
            <Description fontSize="small" /> Name
          </Typography>
          <TextField variant="outlined" fullWidth value={assetDetails.name} />
        </Box>

        {/* Description */}
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" sx={{ flexBasis: '30%' }}>
            <Description fontSize="small" /> Description
          </Typography>
          <TextField variant="outlined" fullWidth value={assetDetails.description} />
        </Box>

        {/* City */}
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" sx={{ flexBasis: '30%' }}>
            <LocationOn fontSize="small" /> City
          </Typography>
          <TextField variant="outlined" fullWidth value={assetDetails.location.city} />
        </Box>

        {/* District */}
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" sx={{ flexBasis: '30%' }}>
            <LocationOn fontSize="small" /> District
          </Typography>
          <TextField variant="outlined" fullWidth value={assetDetails.location.district} />
        </Box>

        {/* Landmarks */}
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" sx={{ flexBasis: '30%' }}>
            <Room fontSize="small" /> Landmarks
          </Typography>
          <TextField variant="outlined" fullWidth value={assetDetails.location.landmarks} />
        </Box>

        {/* Pin Code */}
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" sx={{ flexBasis: '30%' }}>
            <PinDrop fontSize="small" /> Pin Code
          </Typography>
          <TextField variant="outlined" fullWidth value={assetDetails.location.pincode} />
        </Box>

        {/* Survey Code */}
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" sx={{ flexBasis: '30%' }}>
            <Code fontSize="small" /> Survey Code
          </Typography>
          <TextField variant="outlined" fullWidth value={assetDetails.location.surveycode} />
        </Box>

        {/* Location Link */}
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" sx={{ flexBasis: '30%' }}>
            <Link fontSize="small" /> Location Link
          </Typography>
          <TextField variant="outlined" fullWidth value={assetDetails.location.link} />
        </Box>

        {/* Media */}
        {Array.isArray(assetDetails.media) && assetDetails.media.length > 0 && (
          <Box mt={2} display="flex">
            {assetDetails.media.map((mediaLink, index) => (
              <img
                key={index}
                src={mediaLink}
                alt={`Asset Media ${index + 1}`}
                style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', marginRight: '8px' }}
              />
            ))}
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default AssetDetailsPage;


