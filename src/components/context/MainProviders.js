import React from 'react';

import PropTypes from 'prop-types';

import { LayoutContextProvider } from './LayoutContext';

const ModalProviders = ({ children }) => (
  <LayoutContextProvider>{children}</LayoutContextProvider>
);

ModalProviders.propTypes = {
  children: PropTypes.node,
};

ModalProviders.defaultProps = {
  children: null,
};

export default ModalProviders;
