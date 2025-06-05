// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import * as api from '../api';

const ProfileContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme => theme.spacing(4),
  paddingTop: theme => theme.spacing(4),
});

const ProfileAvatar = styled(Avatar)({
  width: theme => theme.spacing(10),
  height: theme => theme.spacing(10),
});

const ProfileForm = styled('form')({
  width: '100%',
  maxWidth: '400px',
  margin: 'auto',
  display: 'grid',
  gap: theme => theme.spacing(2),
});

const SaveButton = styled(Button)({
  marginTop: theme => theme.spacing(2),
});

const UserProfile = () => {
  const [isEditing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phoneno: '',
    email: '',
    role: '',
    subscriptionPlan: '',
    profileImg: '',
    location: '',
  });

  const fetchUserProfile = async () => {
    try {
      const response = await api.getProfile();
      // console.log('API Response:', response);
  
      if (response.success) {
        const userDataFromResponse = response.data[0]; // Assuming user data is the first element in the array
        const { assets, ...userDataWithoutAssets } = userDataFromResponse;
  
        setUserData(userDataWithoutAssets);
      } else {
        console.error('Error fetching user profile:', response.message);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  
  useEffect(() => {
    fetchUserProfile();
  }, []);
  

  // useEffect(() => {
  //   console.log('UserData:', userData);
  // }, [userData]);

  const handleInputChange = (field, value) => {
    console.log('Input Change:', field, value);
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // console.log('Rendering UserProfile:', userData, isEditing);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    setEditing(false);

    try {
      await api.updateProfile(userData);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <Layout>
      <ProfileContainer>
        <ProfileAvatar alt="Profile Picture" src={userData.profileImg || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} />
        <h2>User Profile</h2>
        <ProfileForm>
          <TextField
            label="Name"
            value={userData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            fullWidth
            disabled={!isEditing}
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={userData.phoneno}
            onChange={(e) => handleInputChange('phoneno', e.target.value)}
            fullWidth
            disabled={!isEditing}
            margin="normal"
          />
          <TextField
            label="Email"
            value={userData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            fullWidth
            disabled={!isEditing}
            margin="normal"
          />
          <TextField
            label="Role"
            value={userData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            fullWidth
            disabled={!isEditing}
            margin="normal"
          />
          <TextField
            label="Subscription Plan"
            value={userData.subscriptionPlan}
            onChange={(e) => handleInputChange('subscriptionPlan', e.target.value)}
            fullWidth
            disabled={!isEditing}
            margin="normal"
          />
          <TextField
            label="Location"
            value={userData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            fullWidth
            disabled={!isEditing}
            margin="normal"
          />

          {isEditing ? (
            <SaveButton
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
            >
              Save
            </SaveButton>
          ) : (
            <SaveButton
              variant="outlined"
              color="primary"
              onClick={handleEditClick}
            >
              Edit
            </SaveButton>
          )}
        </ProfileForm>
      </ProfileContainer>
    </Layout>
  );
};

export default UserProfile;
