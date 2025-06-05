import React, { useState } from 'react';
import AssetList from '../components/AssetList';
import AddAssetForm from '../components/AddAssetForm';
import { Button, Typography, Grid } from '@mui/material';
import Layout from '../components/Layout';

const Assets = () => {
  const [isAddAssetFormOpen, setAddAssetFormOpen] = useState(false);

  const handleAssetAdded = (newAsset) => {
    // Implement logic to update the asset list (e.g., fetch the updated list from the backend)
    console.log('Asset added:', newAsset);
    setAddAssetFormOpen(false);
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Asset Management</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => setAddAssetFormOpen(true)}
            variant="contained"
            color="primary"
          >
            Add Asset
          </Button>
        </Grid>
        <Grid item xs={12}>
          <AssetList />
        </Grid>
      </Grid>

      <AddAssetForm
        open={isAddAssetFormOpen}
        onClose={() => setAddAssetFormOpen(false)}
        onAssetAdded={handleAssetAdded}
      />
    </Layout>
  );
};

export default Assets;
