import { type FunctionComponent, type JSX } from "react";
import original from "react95/dist/themes/original";
import { ThemeProvider } from "styled-components";

interface OsDesktopProps {
  children: string | JSX.Element | JSX.Element[];
}

const OsDesktop: FunctionComponent<OsDesktopProps> = (
  props: OsDesktopProps
) => {
  const { children } = props;

  return (
    <>
      <ThemeProvider theme={original}>{children}</ThemeProvider>
    </>
  );
};

export default OsDesktop;
