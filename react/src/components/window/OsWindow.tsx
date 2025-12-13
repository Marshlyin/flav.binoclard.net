import type { FunctionComponent, JSX, MouseEventHandler } from "react";
import { Rnd } from "react-rnd";
import { Button, Toolbar, Window, WindowContent, WindowHeader } from "react95";
import type { WindowId } from "../../state/applications";
import CloseButton from "./CloseButton";

const defaultToolbar = () => {
  return (
    <Toolbar>
      <Button variant="menu" size="sm">
        File
      </Button>
      <Button variant="menu" size="sm">
        Edit
      </Button>
      <Button variant="menu" size="sm" disabled>
        Save
      </Button>
    </Toolbar>
  );
};

interface OsWindowProps {
  key: WindowId;
  title: string;
  withToolbar?: boolean;
  customToolbar?: JSX.Element;
  children: string | JSX.Element | JSX.Element[];
  onClose: MouseEventHandler;
}

const OsWindow: FunctionComponent<OsWindowProps> = (props) => {
  const {
    key,
    title,
    withToolbar = false,
    customToolbar,
    children,
    onClose,
  } = props;

  const renderToolbar = () => {
    if (withToolbar) {
      if (customToolbar) {
        return customToolbar;
      } else {
        return defaultToolbar();
      }
    }
    return undefined;
  };

  return (
    <>
      <Rnd dragHandleClassName="window-title">
        <Window>
          <WindowHeader className="window-title">
            {title}
            <CloseButton onClick={onClose} />
          </WindowHeader>
          {renderToolbar()}
          <WindowContent>{children}</WindowContent>
        </Window>
      </Rnd>
    </>
  );
};

export default OsWindow;
