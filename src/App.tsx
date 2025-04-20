import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout/MainLayout';
import { CalcLayout } from '@layouts/CalcLayout/CalcLayout';
import Step1Page from '@pages/Step1/Step1Page';
import Step2Page from '@pages/Step2/Step2Page';
import Step3Page from '@pages/Step3/Step3Page';
import Favorites from '@pages/static/Favorites/Favorites';
import NotFoundPage from '@pages/static/NotFound/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <CalcLayout>
            <Step1Page />
          </CalcLayout>
        ),
      },
      {
        path: 'step2',
        element: (
          <CalcLayout>
            <Step2Page />
          </CalcLayout>
        ),
      },
      {
        path: 'step3',
        element: (
          <CalcLayout>
            <Step3Page />
          </CalcLayout>
        ),
      },
      {
        path: 'favorites',
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
