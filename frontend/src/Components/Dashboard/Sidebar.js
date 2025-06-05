import React from 'react'
import '../../Stylesheets/Style.css';
import { SidebarData } from '../Data/SidebarData'

function Sidebar() {
  return(
    <div className='Sidebar'>
      <h1> Land Manager</h1>
      <ul className='SidebarList'>
        {
          SidebarData.map((val,key) => {
            return(
              <li key={key}  className='row'
               id={window.location.pathname === val.link? "active" : ""}
               onClick={() => {window.location.pathname = val.link}}>
                <div id="icon">{val.icon}</div><div id="title">{val.title}</div>
              </li>
            );
          })
        }
      </ul>
      
    </div>
)
}

export default Sidebar
