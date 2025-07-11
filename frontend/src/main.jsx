import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import HomePage from './pages/HomePage';
import Programs from './pages/Programs';
import BTech from './pages/btech';
import MSc from './pages/MSc';
import PhD from './pages/PhD';
import LoginPage from './pages/LoginPage';
import PeoplePage from './pages/PeoplePage';
import ContactPage from './pages/ContactPage';
import ResearchPage from './pages/ResearchPage';
import GalleryPage from './pages/GalleryPage';
import ProfilePage from './pages/ProfilePage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import ManageFacultyPage from './pages/ManageFacultyPage';
import UpdateFacultyPage from './pages/UpdateFacultyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement:<ErrorPage/>,
    children: [
      {
        path:'/',
        element: <HomePage />,
      },
      {
        path: '/programs',
        element: <Programs />,
        children: [
          {path: 'btech', element: <BTech />},
          {path: 'msc', element: <MSc />},
          {path: 'phd', element: <PhD />},
        ]
      },
      {

        path:'login',
        element:<LoginPage/>
      },
      {
        path:'people',
        element:<PeoplePage/>
      },
      {
        path:'contact',
        element:<ContactPage/>
      },
      {
        path:'research',
        element:<ResearchPage/>
      },
      {
        path:'gallery',
        element:<GalleryPage/>
      },
      {
        path:'profile',
        element:<ProfilePage/>
      },
      {
        path:'update-profile',
        element:<UpdateProfilePage/>
      },
      {
        path:'manage-faculty',
        element:<ManageFacultyPage/>
      },
      {
        path:'update-faculty/:id',
        element:<UpdateFacultyPage/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
