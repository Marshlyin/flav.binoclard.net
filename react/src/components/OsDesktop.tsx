import { type FunctionComponent, type JSX } from "react";
import { ThemeProvider } from "styled-components";
import themes from "../themes/theme";
import OsAppBar from "./taskbar/OsAppBar";
import applications from "../content/applications.json";
import OsWindow from "./window/OsWindow";
import type { Application } from "../state/applications";
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
      return (
        <OsWindow title={`${app.icon} ${app.label}`} withToolbar>
          <div>
            Esse elit non ullamco id. <br />
            Deserunt nulla aliquip consequat cupidatat labore amet quis. <br />
            Et exercitation aliquip non ea minim quis et ex. <br />
            Sint quis deserunt aliquip fugiat est velit sint esse duis eiusmod
            nulla proident quis.
            <br />
            Ea nisi non enim sit occaecat consequat magna laborum Lorem.
          </div>
        </OsWindow>
      );
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
