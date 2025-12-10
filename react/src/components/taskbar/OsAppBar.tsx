import { useState, type FunctionComponent } from "react";
import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  Toolbar,
} from "react95";
import OsClock from "./OsClock";

const OsAppBar: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AppBar className="taskbar">
      <Toolbar className="justify-space-between">
        <div className="relative">
          <Button onClick={() => setOpen(!open)} active={open} className="bold">
            Start
          </Button>
          {open && (
            <MenuList className="menu" onClick={() => setOpen(false)}>
              <MenuListItem>
                <span role="img" aria-label="👨‍💻">
                  👨‍💻
                </span>
                About
              </MenuListItem>
              <MenuListItem>
                <span role="img" aria-label="🤓" className="mr-8">
                  🤓
                </span>
                Binoclard
              </MenuListItem>
              <MenuListItem>
                <span role="img" aria-label="🖥️">
                  🖥️
                </span>
                OS
              </MenuListItem>
              <MenuListItem>
                <span role="img" aria-label="📋">
                  📋
                </span>
                Changelog
              </MenuListItem>
              <MenuListItem>
                <span role="img" aria-label="⚙️">
                  ⚙️
                </span>
                Settings
              </MenuListItem>
              <Separator />
              <MenuListItem disabled>
                <span role="img" aria-label="🔙">
                  🔙
                </span>
                Logout
              </MenuListItem>
            </MenuList>
          )}
        </div>

        <div>
          <OsClock />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default OsAppBar;
