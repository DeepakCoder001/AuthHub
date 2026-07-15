import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Logout from './components/Logout';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    children: [
      {
        index: true,
        element: <Navigate to="/register" replace />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'home',
            element: <Home />
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'logout',
            element: <Logout />
          }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
