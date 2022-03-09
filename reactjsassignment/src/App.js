import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import PostsPage from './Pages/PostsPage/PostsPage';
import { BrowserRouter, Routes, Route, Link, } from "react-router-dom";
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import PostPage from './Pages/PostsPage/PostPage';
const PATHS = {
  HOME: '/',
  POST: '/posts',
  PROFILE: '/profile',
  LOGIN: '/login'
};
const Routers = [
  {
    path: PATHS.HOME,
    element: (<HomePage />)
  },
  {
    path: PATHS.POST,
    element: (<PostsPage />)
  },
  {
    path: PATHS.PROFILE,
    element: (<ProfilePage />)
  },
  {
    path: PATHS.LOGIN,
    element: (<LoginPage />)
  }
];
const NavBars = [
  {
    path: PATHS.HOME,
    title: 'Home'
  },
  {
    path: PATHS.POST,
    title: 'Posts'
  },
  {
    path: PATHS.PROFILE,
    title: 'Profile'
  },
  {
    path: PATHS.LOGIN,
    title: 'Login'
  }
];
function App() {
  return (
    <div>
      <BrowserRouter>
        <ul style={{ display: 'flex' }}>
          {NavBars.map(navbar => (
            <Link style={{ margin: 20 }} to={navbar.path}>{navbar.title}</Link>
          ))}
        </ul>
        <Routes>
          {Routers.map(route => (
            <Route path={route.path} element={route.element}>
            </Route>
          ))}
            <Route path="Posts/:id" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
