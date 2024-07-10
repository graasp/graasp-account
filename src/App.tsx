import { Route, Routes } from 'react-router-dom';

import {
  EMAIL_CHANGE_VALIDATION_PATH,
  HOME_PATH,
  PROFILE_PATH,
  SETTINGS_PATH,
  STORAGE_PATH,
} from './config/paths';
import EmailChangeValidationScreen from './pages/EmailChangeValidationScreen';
import HomePage from './pages/HomePage';
import PageWrapper from './pages/PageWrapper';
import ProfileScreen from './pages/ProfileScreen';
import RequireAuthentication from './pages/RequireAuthentication';
import SettingsScreen from './pages/SettingsScreen';
import StorageScreen from './pages/StorageScreen';

export const App = (): JSX.Element => (
  <Routes>
    <Route
      path={EMAIL_CHANGE_VALIDATION_PATH}
      element={<EmailChangeValidationScreen />}
    />
    <Route element={<RequireAuthentication />}>
      <Route element={<PageWrapper />}>
        <Route path={HOME_PATH} element={<HomePage />} />
        <Route path={PROFILE_PATH} element={<ProfileScreen />} />
        <Route path={STORAGE_PATH} element={<StorageScreen />} />
        <Route path={SETTINGS_PATH} element={<SettingsScreen />} />
      </Route>
    </Route>
  </Routes>
);

export default App;
