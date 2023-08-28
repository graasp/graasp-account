import React, { useMemo, useState } from 'react';

import PropTypes from 'prop-types';

const LayoutContext = React.createContext();

const LayoutContextProvider = ({ children }) => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true);

  const value = useMemo(
    () => ({
      isMainMenuOpen,
      setIsMainMenuOpen,
    }),
    [isMainMenuOpen, setIsMainMenuOpen],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

LayoutContextProvider.propTypes = {
  children: PropTypes.node,
};

LayoutContextProvider.defaultProps = {
  children: null,
};

export { LayoutContext, LayoutContextProvider };
