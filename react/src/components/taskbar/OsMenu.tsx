import { useState, type FunctionComponent } from "react";
import type { Application } from "../../state/applications";
import { Button, MenuList, MenuListItem, Separator } from "react95";

interface OsMenuProps {
  applications: Application[];
  openWindow: Function;
}

const OsMenu: FunctionComponent<OsMenuProps> = (props: OsMenuProps) => {
  const { applications, openWindow } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)} active={open} className="bold">
        Start
      </Button>
      {open && (
        <MenuList className="menu" onClick={() => setOpen(false)}>
          {applications.map((app: Application) => {
            if (app.menu_category === "Main")
              return (
                <MenuListItem
                  disabled={app.disabled}
                  onClick={() => {
                    openWindow(app.id);
                  }}
                >
                  <span role="img" aria-label={app.icon} className="mr-8">
                    {app.icon}
                  </span>
                  {app.label}
                </MenuListItem>
              );
          })}
          <Separator />
          {applications.map((app: Application) => {
            if (app.menu_category === "Secondary")
              return (
                <MenuListItem
                  disabled={app.disabled}
                  onClick={() => {
                    openWindow(app.id);
                  }}
                >
                  <span role="img" aria-label={app.icon} className="mr-8">
                    {app.icon}
                  </span>
                  {app.label}
                </MenuListItem>
              );
          })}
        </MenuList>
      )}
    </>
  );
};

export default OsMenu;
