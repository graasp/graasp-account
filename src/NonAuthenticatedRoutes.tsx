import { Route, Routes } from 'react-router-dom';

import { EMAIL_CHANGE_VALIDATION_PATH } from './config/paths';
import EmailChangeValidationScreen from './pages/EmailChangeValidationScreen';

// eslint-disable-next-line import/prefer-default-export, arrow-body-style
export const NonAuthenticatedRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path={EMAIL_CHANGE_VALIDATION_PATH}
        element={<EmailChangeValidationScreen />}
      />
    </Routes>
  );
};

export default NonAuthenticatedRoutes;
