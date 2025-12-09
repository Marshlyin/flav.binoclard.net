import { type FunctionComponent, type JSX } from "react";
import { ThemeProvider } from "styled-components";
import themes from "../themes/theme";
import OsAppBar from "./taskbar/OsAppBar";

interface OsDesktopProps {
  children: string | JSX.Element | JSX.Element[];
}

const OsDesktop: FunctionComponent<OsDesktopProps> = (
  props: OsDesktopProps
) => {
  const { children } = props;
  const theme = "original";

  return (
    <div className="desktop">
      <ThemeProvider theme={themes[theme]}>
        <OsAppBar />
        {children}
      </ThemeProvider>
    </div>
  );
};

export default OsDesktop;
