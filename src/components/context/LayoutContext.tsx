import React, { Dispatch, useMemo, useState } from 'react';

type ContextType = {
  isMainMenuOpen: boolean;
  setIsMainMenuOpen: Dispatch<boolean>;
};

const LayoutContext = React.createContext<ContextType>({
  isMainMenuOpen: true,
  setIsMainMenuOpen: () => {},
});

const LayoutContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
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

export { LayoutContext, LayoutContextProvider };
