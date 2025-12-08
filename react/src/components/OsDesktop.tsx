import { type FunctionComponent, type JSX } from "react";
import { ThemeProvider } from "styled-components";
import themes from "../themes/theme";
import OsAppBar from "./OsAppBar";

interface OsDesktopProps {
  children: string | JSX.Element | JSX.Element[];
}

const OsDesktop: FunctionComponent<OsDesktopProps> = (
  props: OsDesktopProps
) => {
  const { children } = props;
  const theme = "original";

  return (
    <>
      <ThemeProvider theme={themes[theme]}>
        <OsAppBar />
        {children}
      </ThemeProvider>
    </>
  );
};

export default OsDesktop;
