import React, { FC, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

type ResponsiveContextState = {
  gteSm: boolean;
  gteMd: boolean;
  gteLg: boolean;
  gteXl: boolean;
  gte2Xl: boolean;
  gte3Xl: boolean;
};

export const UIResponsiveContext = React.createContext<ResponsiveContextState>({
  gteSm: false,
  gteMd: false,
  gteLg: false,
  gteXl: false,
  gte2Xl: false,
  gte3Xl: false,
});

const UIResponsiveProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const gteSm = useMediaQuery({
    query: "(min-width: 576px)",
  });
  const gteMd = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const gteLg = useMediaQuery({
    query: "(min-width: 992px)",
  });
  const gteXl = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  const gte2Xl = useMediaQuery({
    query: "(min-width: 1400px)",
  });
  const gte3Xl = useMediaQuery({
    query: "(min-width: 1920px)",
  });

  const state = React.useMemo<ResponsiveContextState>(
    () => ({
      gteSm,
      gteMd,
      gteLg,
      gteXl,
      gte2Xl,
      gte3Xl,
    }),
    [gteSm, gteMd, gteLg, gteXl, gte2Xl, gte3Xl]
  );

  return (
    <UIResponsiveContext.Provider value={state}>
      {children}
    </UIResponsiveContext.Provider>
  );
};

export default UIResponsiveProvider;
