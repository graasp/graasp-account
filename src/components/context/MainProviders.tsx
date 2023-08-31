

import React from 'react';
import { LayoutContextProvider } from './LayoutContext';

const ModalProviders = ({ children }:{children:React.ReactNode}):JSX.Element => (
  <LayoutContextProvider>{children}</LayoutContextProvider>
);

export default ModalProviders;
