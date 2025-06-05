import React from 'react'
import '../../Stylesheets/Style.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
function Header() {
  return (
    <header className='Header'>
        <div className='right'>
            <NotificationsIcon className='icon'/>
            <SettingsIcon className='icon'/>
            <AccountCircleOutlinedIcon className='icon'/>
        </div>
    </header>
  )
}

export default Header
