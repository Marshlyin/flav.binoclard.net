import { useEffect, useState, type FunctionComponent } from "react";
import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  Toolbar,
} from "react95";
import OsClock from "./OsClock";
import type { Application } from "../../state/applications";
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
