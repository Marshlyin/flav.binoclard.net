import { useState, type FunctionComponent, type JSX } from "react";
import { ThemeProvider } from "styled-components";
import type { Application, WindowId } from "../state/applications";
import {
  applications,
  defaultOpenedApplication,
} from "../state/applications.ts";
import themes from "../themes/theme";
import OsAppBar from "./taskbar/OsAppBar";
interface OsDesktopProps {
  children?: string | JSX.Element | JSX.Element[];
}

const OsDesktop: FunctionComponent<OsDesktopProps> = (
  props: OsDesktopProps
) => {
  const { children } = props;
  const theme = "original";

  const [openWindowsIds, setOpenWindowsIds] = useState<WindowId[]>(
    defaultOpenedApplication
  );

  const openWindow = (id: WindowId) => {
    setOpenWindowsIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const closeWindow = (id: WindowId) => {
    setOpenWindowsIds((prev) => prev.filter((w) => w !== id));
  };

  const renderApps = (openWindowsIds: WindowId[]) => {
    const apps: Application[] = applications;
    return apps.map((app) => {
      const Comp = app.component;
      if (openWindowsIds.includes(app.id)) {
        return (
          <Comp
            key={app.id}
            title={`${app.icon} ${app.label}`}
            onClose={() => closeWindow(app.id)}
          />
        );
      }
    });
  };

  return (
    <div className="desktop">
      <ThemeProvider theme={themes[theme]}>
        <OsAppBar
          applications={applications}
          openWindow={openWindow}
          openWindowsIds={openWindowsIds}
        />
        {renderApps(openWindowsIds)}
        {children}
      </ThemeProvider>
    </div>
  );
};

export default OsDesktop;
