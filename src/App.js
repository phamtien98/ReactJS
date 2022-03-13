import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import React from 'react';
import PostsPage from './Pages/PostsPage/PostsPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import PostPage from './Pages/PostsPage/PostPage';
import LogOutPage from './Pages/LogOutPage/LogOutPage';
const PATHS = {
  HOME: '/',
  POST: '/posts',
  PROFILE: '/profile',
};
const Routers = [
  {
    path: PATHS.HOME,
    element: <HomePage />,
  },
  {
    path: PATHS.POST,
    element: <PostsPage />,
  },
  {
    path: PATHS.PROFILE,
    element: <ProfilePage />,
  }
];
const NavBars = [
  {
    path: PATHS.HOME,
    title: 'Home',
  },
  {
    path: PATHS.POST,
    title: 'Posts',
  },
  {
    path: PATHS.PROFILE,
    title: 'Profile',
  }
];
function App() {
  const ClearData= ()=>{
    localStorage.clear() 
    window.sessionStorage.clear()
    window.location.reload()
  }
  const Change=()=>{
    window.location.reload()
  }
  if (window.sessionStorage.getItem("id") === null && localStorage.getItem("id") === null) {
    return (
      <div>
        <BrowserRouter>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              {NavBars.map(item => (
                <Link to={item.path}>
                  <Typography className="link-title" variant="body1" component="div" sx={{ flexGrow: 1 }}>
                    {item.title}
                  </Typography>
                </Link>
              ))}
              <Link to={'/login'}>
                <Typography onChange={Change} className="link-title" variant="body1" component="div" sx={{ flexGrow: 1 }}>
                  LogIn
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
          <Routes>
            {Routers.map((route) => (
              <Route path={route.path} element={route.element}></Route>
            ))}
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="Posts/:id" element={<PostPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  else {
    return (
      <div>
        <BrowserRouter>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              {NavBars.map(item => (
                <Link to={item.path}>
                  <Typography className="link-title" variant="body1" component="div" sx={{ flexGrow: 1 }}>
                    {item.title}
                  </Typography>
                </Link>
              ))}
              <Link to={'/login'}>
                <Typography onClick={ClearData} className="link-title" variant="body1" component="div" sx={{ flexGrow: 1 }}>
                  Logout
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
          <Routes>
            {Routers.map((route) => (
              <Route path={route.path} element={route.element}></Route>
            ))}
             <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="Posts/:id" element={<PostPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );

  }
}
export default App;
