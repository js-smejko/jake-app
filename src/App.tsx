import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayoutPage from './pages/RootLayoutPage';
import CVPage from './pages/CVPage';
import ProjectsLayoutPage from './Projects/ProjectsLayoutPage';
import AutonomousVehiclePage from './Projects/AutonomousVehiclePage';
import CADSoftwarePage from './Projects/CADSoftwarePage';
import PulseOximeterPage from './Projects/PulseOximeterPage';
import HomePage from './pages/HomePage';
import DissertationPage from './Projects/DissertationPage';
import KroyairPage from './Projects/KroyairPage';
import DocumentsLayoutPage from './pages/DocumentsLayoutPage';
import ProjectsPage from './Projects/ProjectsPage';
import ErrorPage from './pages/ErrorPage';
import EyeTrackerPage from './Projects/EyeTrackerPage';
import AboutPage from './pages/AboutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/cv',
        element: <CVPage />
      },
      {
        path: '/projects',
        element: <ProjectsLayoutPage />,
        children: [
          {
            index: true,
            element: <ProjectsPage />
          },
          {
            path: 'autonomous-vehicle',
            element: <AutonomousVehiclePage />
          },
          {
            path: 'pulse-oximeter',
            element: <PulseOximeterPage />
          },
          {
            path: 'cad-software',
            element: <CADSoftwarePage />
          },
          {
            path: 'kroyair',
            element: <KroyairPage />
          },
          {
            path: 'dissertation',
            element: <DissertationPage />
          },
          {
            path: 'eye-tracking',
            element: <EyeTrackerPage />
          }
        ]
      },
      {
        path: 'documents',
        element: <DocumentsLayoutPage />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
