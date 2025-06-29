import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppDispatch } from './store';
import { initFormData } from '@store/slices/step1FormSlice/step1FormSlice';
import { selectStep1FormInitialized } from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { MainLayout } from '@layouts/MainLayout/MainLayout';
import { CalcLayout } from '@layouts/CalcLayout/CalcLayout';
import Step1Page from '@pages/Step1/Step1Page';
import Step2Page from '@pages/Step2/Step2Page';
import Step3Page from '@pages/Step3/Step3Page';
import About from '@pages/static/About/About';
import PrivacyPage from '@pages/static/PrivacyPage/PrivacyPage';
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
        path: 'about',
        element: <About />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const initialized = useSelector(selectStep1FormInitialized);

  useEffect(() => {
    if (!initialized) {
      dispatch(initFormData());
    }
  }, [initialized, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
