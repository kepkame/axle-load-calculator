import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout';
import Step1Page from '@pages/Step1/Step1Page';
import Step2Page from '@pages/Step2/Step2Page';
import Step3Page from '@pages/Step3/Step3Page';
import Favorites from '@pages/Favorites/Favorites';
import NotFoundPage from '@pages/NotFound/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Step1Page />,
      },
      {
        path: '/step2',
        element: <Step2Page />,
      },
      {
        path: '/step3',
        element: <Step3Page />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
