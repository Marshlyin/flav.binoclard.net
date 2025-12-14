import { type FunctionComponent } from "react";
import { AppBar, Button, Handle, Toolbar } from "react95";
import type { Application, WindowId } from "../../state/applications";
import OsClock from "./OsClock";
import OsMenu from "./OsMenu";

interface OsAppBarProps {
  applications: Application[];
  openWindow: Function;
  openWindowsIds: WindowId[];
}

const OsAppBar: FunctionComponent<OsAppBarProps> = (props: OsAppBarProps) => {
  const { applications, openWindow, openWindowsIds } = props;
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
              <Button active className="mr-4">
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
