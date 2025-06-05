import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import Registration from './components/Registration';
import UserDashboard from './pages/UserDashboard';
import Registration from './components/Registration';
import Home from './pages/Home';
// import PrivateRoute from './PrivateRoute';
import {useAuth} from "./AuthContext";
import UserProjects from './pages/UserProjects';
import Assets from './pages/Assets';
import Notifications from './pages/Notifications';
import UserProfile from './pages/UserProfile';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import AdminLogin from './pages/AdminLogin';
import ErrorPage from './pages/ErrorPage';
import AssetDetailsPage from './pages/AssetDetailsPage';
import AdminRegister from './pages/AdminRegister';

function App() {
  // Check if the user is authenticated (e.g., by checking cookies or the authentication state)
  const { authenticated, isAdmin } = useAuth();
  console.log(isAdmin)
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />  
        <Route
          path="/registration"
          element={authenticated ? <Navigate to="/user/dashboard" /> : <Registration />}
        />        
        {/* <Route path="/user" element={authenticated ? <UserDashboard /> : <Navigate to="/registration"/>} /> */}


        <Route path="/user/dashboard" element={authenticated ? <UserDashboard />:<Navigate to="/registration" />} />
        <Route path="/user/projects" element={authenticated ? <UserProjects />:<Navigate to="/registration" />} />
        <Route path="/user/assets" element={authenticated ? <Assets />:<Navigate to="/registration" />} />
        <Route path="/user/notifications" element={authenticated ? <Notifications />:<Navigate to="/registration" />} />
        <Route path="/user/profile" element={authenticated ? <UserProfile />:<Navigate to="/registration" />} />
        <Route path="/user/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/user/assets/:assetId" element={<AssetDetailsPage />} />
        <Route path="/admin/register" element={<AdminRegister />}></Route>
        <Route path="*" element={<ErrorPage />} />


        {/* Admin Routes */}
        {/* <Route path="/admin/login" element={ <AdminLogin />} /> */}
        <Route path="/admin/login" element={authenticated && !isAdmin ? <Navigate to="/user/dashboard" /> : <AdminLogin />} />
        {/* <Route path="/admin/dashboard" element={authenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
