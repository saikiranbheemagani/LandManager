import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarData = [
    {
        icon: <DashboardIcon/>,
        title: " Dashboard",
        link: "/Home"
    },


    {
        icon: <AdUnitsIcon/>,
        title: "Projects ",
        link: "/Home"
    },

    {
        icon: <ChatIcon/>,
        title: "Chats",
        link: "/Home"
    },
     
    {
        icon: <NotificationsIcon/>,
        title: "Notifications",
        link: "/Home"
    },
      
    {
        icon: <AccountBoxIcon/>,
        title: "Profile",
        link: "/Home"
    },

    {
        icon: <LogoutIcon/>,
        title: "Logout",
        link: "/Home"
    },

    
];