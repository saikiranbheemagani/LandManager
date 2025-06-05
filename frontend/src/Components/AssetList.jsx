import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getAssets, removeAsset } from '../api';
import EditAssetForm from './EditAssetForm';
import { Link } from 'react-router-dom';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isEditAssetFormOpen, setEditAssetFormOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    // Fetch assets from the backend
    getAssets()
      .then((data) => {
        setAssets(data.data);
        console.log(data.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching assets:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const handleRemoveAsset = async (assetId) => {
    try {
      await removeAsset(assetId);
      // Reload the assets after removal
      const updatedAssets = await getAssets();
      setAssets(updatedAssets.data);
    } catch (error) {
      console.error('Error removing asset:', error);
    }
  };

  const handleEditAsset = (asset) => {
    setSelectedAsset(asset);
    setEditAssetFormOpen(true);
  };

  const handleUpdateAsset = (updatedAsset) => {
    // Update the assets state after editing
    const updatedAssets = assets.map((asset) =>
      asset._id === updatedAsset._id ? updatedAsset : asset
    );
    setAssets(updatedAssets);
  };

  return (
    <div>
      <Typography variant="h5">Asset List</Typography>
      {isLoading ? (
        // Display loading spinner while data is being fetched
        <CircularProgress style={{ marginTop: '20px' }} />
      ) : (
        <Grid container spacing={3} data-cy="assets-list">
                {/* Asset Section */}
                <Grid item xs={12}>
                  <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h4">My Assets</Typography>
                    <Typography variant="h6">Total Assets: {assets.length}</Typography>
                    <Grid container spacing={2}>
                      {assets.map((asset) => (
                        <Grid item key={asset._id} xs={12} sm={6} md={4} lg={3}>
                          <Link to={`/user/assets/${asset._id}`}>
                          <Card data-cy="asset-item">
                            <CardContent>
                              <Typography variant="h6">{asset.name}</Typography>
                              <Typography variant="body2">{asset.description}</Typography>
                              <Typography variant="caption">
                                {`${asset.location.city}, ${asset.location.district}`}
                              </Typography>
                              <div style={{ marginTop: '16px' }}>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  startIcon={<Edit />}
                                  onClick={() => handleEditAsset(asset)}
                                >
                                  Edit
                                </Button>
                                <IconButton
                                  color="secondary"
                                  onClick={() => handleRemoveAsset(asset._id)}
                                >
                                  <Delete />
                                </IconButton>
                              </div>
                            </CardContent>
                          </Card>
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
          </Grid>
          </Grid>
         )}
      <EditAssetForm
        open={isEditAssetFormOpen}
        onClose={() => setEditAssetFormOpen(false)}
        asset={selectedAsset}
        onUpdateAsset={handleUpdateAsset}
      />
    </div>
  );
};

export default AssetList;