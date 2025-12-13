import type { FunctionComponent, JSX, MouseEventHandler } from "react";
import { Rnd } from "react-rnd";
import { Button, Toolbar, Window, WindowContent, WindowHeader } from "react95";
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
  title: string;
  withToolbar?: boolean;
  customToolbar?: JSX.Element;
  children: string | JSX.Element | JSX.Element[];
  onClose: MouseEventHandler;
  size?: "small" | "medium" | "large" | "xlarge";
}

const OsWindow: FunctionComponent<OsWindowProps> = (props) => {
  const {
    title,
    withToolbar = false,
    customToolbar,
    children,
    onClose,
    size = "medium",
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
      <Rnd
        dragHandleClassName="window-title"
        size={{ width: "100%", height: "auto" }}
        enableResizing={false}
      >
        <Window className={`window-${size}`}>
          <WindowHeader className="window-title">
            {title}
            <CloseButton onClick={onClose} />
          </WindowHeader>
          {renderToolbar()}
          <WindowContent className="d-flex">
            <div>{children}</div>
          </WindowContent>
        </Window>
      </Rnd>
    </>
  );
};

export default OsWindow;
