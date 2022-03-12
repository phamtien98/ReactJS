import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import React from 'react';
import PostsPage from './Pages/PostsPage/PostsPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import PostPage from './Pages/PostsPage/PostPage';
const PATHS = {
  HOME: '/',
  POST: '/posts',
  PROFILE: '/profile',
  LOGIN: '/login',
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
  },
  {
    path: PATHS.LOGIN,
    element: <LoginPage />,
  },
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
  },
  {
    path: PATHS.LOGIN,
    title: 'Login',
  },
];
function App() {
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

          </Toolbar>
        </AppBar>
        <Routes>
          {Routers.map((route) => (
            <Route path={route.path} element={route.element}></Route>
          ))}
          <Route path="Posts/:id" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
