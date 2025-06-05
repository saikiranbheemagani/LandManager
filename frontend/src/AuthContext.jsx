import { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(['role', 'accessToken']);

  // Initialize state from cookies
  const [authenticated, setAuthenticated] = useState(!!cookies.accessToken);
  const [accessToken, setAccessToken] = useState(cookies.accessToken || null);
  const [isAdmin, setIsAdmin] = useState(cookies.role === 'ADM');
  const [userRole, setUserRole] = useState(cookies.role || "");

  useEffect(() => {
    // Update state if cookies change
    setAuthenticated(!!cookies.accessToken);
    setAccessToken(cookies.accessToken || null);
    setIsAdmin(cookies.role === 'ADM');
    setUserRole(cookies.role || "");
  }, [cookies]);

  const login = (token,refreshToken,role) => {
    setCookie('accessToken', token, {path: '/', secure: true, sameSite: 'None' });
    setCookie('refreshToken', refreshToken, { path: '/', secure: true, sameSite: 'None' });
    setCookie('role', role, { path: '/', secure: true, sameSite: 'None' });
    // setCookie('accessToken', token, { domain:"https://landmanager-app.netlify.app",path: '/', secure: true, sameSite: 'None' });
    // setCookie('refreshToken', refreshToken, {  domain:"https://landmanager-app.netlify.app",path: '/', secure: true, sameSite: 'None' });
    // setCookie('role', role, { domain:"https://landmanager-app.netlify.app",path: '/', secure: true, sameSite: 'None' });
    setAccessToken(token);
    setAuthenticated(true);
    setUserRole(role);
    setIsAdmin(role === 'ADM');
  };

  const logout = () => {
    removeCookie('accessToken', { path: '/' });
    removeCookie('role', { path: '/' });
    setAccessToken(null);
    setAuthenticated(false);
    setIsAdmin(false);
    setUserRole("");
  };

  return (
    <AuthContext.Provider value={{ authenticated, accessToken, login, logout, isAdmin, userRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
