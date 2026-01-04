import { type FunctionComponent } from "react";
import { AppBar, Button, Handle, Toolbar } from "react95";
import type { Application, WindowId } from "../../state/applications";
import OsClock from "./OsClock";
import OsMenu from "./OsMenu";

interface OsAppBarProps {
  applications: Application[];
  openWindow: Function;
  openWindowsIds: WindowId[];
  focusedWindowId?: WindowId;
  onClick: Function;
}

const OsAppBar: FunctionComponent<OsAppBarProps> = (props: OsAppBarProps) => {
  const { applications, openWindow, openWindowsIds, focusedWindowId, onClick } =
    props;
  return (
    <AppBar className="taskbar">
      <Toolbar className="justify-space-between">
        <div>
          <OsMenu applications={applications} openWindow={openWindow} />
          <Handle size={15} className="ml-8 mr-8" />
          {openWindowsIds.map((id) => {
            const currentApp = applications.find((app) => {
              return app.id === id;
            });

            return (
              <Button
                active={currentApp?.id === focusedWindowId}
                className="mr-4"
                onClick={() => {
                  currentApp?.id === focusedWindowId
                    ? onClick(undefined)
                    : onClick(currentApp?.id);
                }}
              >
                {`${currentApp?.icon} ${currentApp?.label}`}
              </Button>
            );
          })}
        </div>
        <div>
          <OsClock />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default OsAppBar;
