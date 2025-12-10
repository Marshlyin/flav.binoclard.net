import { type FunctionComponent, type JSX } from "react";
import { ThemeProvider } from "styled-components";
import type { Application } from "../state/applications";
import applications from "../state/applications.ts";
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

  const renderApps = () => {
    const apps: Application[] = applications;
    return apps.map((app) => {
      const Comp = app.component;
      return <Comp title={`${app.icon} ${app.label}`} />;
    });
  };

  return (
    <div className="desktop">
      <ThemeProvider theme={themes[theme]}>
        <OsAppBar applications={applications} />
        {renderApps()}
        {children}
      </ThemeProvider>
    </div>
  );
};

export default OsDesktop;
