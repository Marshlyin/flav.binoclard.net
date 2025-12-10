import { type FunctionComponent } from "react";
import { AppBar, Toolbar } from "react95";
import type { Application } from "../../state/applications";
import OsClock from "./OsClock";
import OsMenu from "./OsMenu";

interface OsAppBarProps {
  applications: Application[];
}

const OsAppBar: FunctionComponent<OsAppBarProps> = (props: OsAppBarProps) => {
  const { applications } = props;
  return (
    <AppBar className="taskbar">
      <Toolbar className="justify-space-between">
        <div className="relative">
          <OsMenu applications={applications} />
        </div>

        <div>
          <OsClock />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default OsAppBar;
