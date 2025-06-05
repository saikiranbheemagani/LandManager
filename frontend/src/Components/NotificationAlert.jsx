// NotificationAlert.jsx

import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const NotificationAlert = ({ title, description, severity }) => {
  const alertStyle = {
    marginBottom: '16px', // Adjust the margin bottom as needed
  };

  return (
    <Alert severity={severity} style={alertStyle}>
      <AlertTitle>{title}</AlertTitle>
      {description}
    </Alert>
  );
};

export default NotificationAlert;
