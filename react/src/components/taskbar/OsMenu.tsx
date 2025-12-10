import { useState, type FunctionComponent } from "react";
import type { Application } from "../../state/applications";
import { Button, MenuList, MenuListItem, Separator } from "react95";

interface OsMenuProps {
  applications: Application[];
}

const OsMenu: FunctionComponent<OsMenuProps> = (props: OsMenuProps) => {
  const { applications } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)} active={open} className="bold">
        Start
      </Button>
      {open && (
        <MenuList className="menu" onClick={() => setOpen(false)}>
          {applications.map((app: Application) => {
            return (
              <MenuListItem>
                <span role="img" aria-label={app.icon} className="mr-8">
                  {app.icon}
                </span>
                {app.label}
              </MenuListItem>
            );
          })}
          <Separator />
          <MenuListItem>
            <span role="img" aria-label="❓">
              ❓
            </span>
            Help
          </MenuListItem>
          <MenuListItem disabled>
            <span role="img" aria-label="🔙">
              🔙
            </span>
            Logout
          </MenuListItem>
        </MenuList>
      )}
    </>
  );
};

export default OsMenu;
