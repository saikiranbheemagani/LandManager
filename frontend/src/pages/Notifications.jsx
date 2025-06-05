// Notifications.jsx

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import NotificationAlert from '../components/NotificationAlert';
import * as api from '../api';  // Import your modified API file

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when the component mounts
    const fetchNotifications = async () => {
      try {
        const response = await api.getNotifications();  // Use the new function
        if (response.success) {
          
          setNotifications(response.data || []);
        } else {
          console.error('Error fetching notifications:', response.message);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);  // Empty dependency array ensures this effect runs once on mount

  return (
    <Layout>
      <div>
        <h2>Notifications</h2>
        {notifications.map((notification) => (
          <NotificationAlert
            key={notification._id}  // Assuming _id is the unique identifier
            title={`You have a message from ${notification.proj_title}`}
            description={notification.category}
            severity="info"  // You may need to map notification properties to severity as needed
          />
        ))}
      </div>
    </Layout>
  );
};

export default Notifications;
