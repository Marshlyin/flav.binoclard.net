import { useEffect, useState, type FunctionComponent, type JSX } from "react";
import { ThemeProvider } from "styled-components";
import type { Application, WindowId } from "../state/applications";
import {
  applications,
  defaultOpenedApplication,
} from "../state/applications.ts";
import themes, { type ThemeName } from "../themes/theme";
import OsAppBar from "./taskbar/OsAppBar";
import type { BackgroundsName } from "../themes/backgrounds.ts";
import backgrounds from "../themes/backgrounds.ts";
import type { Position } from "../state/position.ts";
interface OsDesktopProps {
  children?: string | JSX.Element | JSX.Element[];
}

const OsDesktop: FunctionComponent<OsDesktopProps> = (
  props: OsDesktopProps
) => {
  const { children } = props;
  const [theme, setTheme] = useState<ThemeName>("original");
  const [background, setBackground] = useState<BackgroundsName>("defaut");

  // Gestion du fond d´ecran
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-background",
      backgrounds[background]
    );
  }, [background]);

  // Gestion des fenetres

  const [openWindowsIds, setOpenWindowsIds] = useState<WindowId[]>(
    defaultOpenedApplication
  );

  const [focusedWindowsId, setFocusedWindowsId] = useState<
    WindowId | undefined
  >(defaultOpenedApplication[0]);

  const openWindow = (id: WindowId) => {
    setOpenWindowsIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setFocusedWindowsId(id);
  };

  const closeWindow = (id: WindowId) => {
    setOpenWindowsIds((prev) => prev.filter((w) => w !== id));
  };

  const focusWindow = (id?: WindowId) => {
    setFocusedWindowsId(id);
  };

  // Gestion des applications
  const renderApps = (openWindowsIds: WindowId[]) => {
    const apps: Application[] = applications;
    return apps.map((app) => {
      const Comp = app.component;
      const position = 100 + 20 * (openWindowsIds.length - 1);
      if (openWindowsIds.includes(app.id)) {
        return (
          <Comp
            key={app.id}
            title={`${app.icon} ${app.label}`}
            position={{ x: position, y: position }}
            onClose={() => closeWindow(app.id)}
            theme={theme}
            onSelectTheme={setTheme}
            background={background}
            onSelectBackground={setBackground}
            isFocused={app.id === focusedWindowsId}
            setFocused={() => {
              setFocusedWindowsId(app.id);
            }}
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
          focusedWindowId={focusedWindowsId}
          onClick={focusWindow}
        />
        {renderApps(openWindowsIds)}
        {children}
      </ThemeProvider>
    </div>
  );
};

export default OsDesktop;
