import {
  type FunctionComponent,
  type JSX,
  type MouseEventHandler,
} from "react";
import { Rnd } from "react-rnd";
import { Button, Toolbar, Window, WindowContent, WindowHeader } from "react95";
import CloseButton from "./CloseButton";
import type { Position } from "../../state/position";

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
  position: Position;
  withToolbar?: boolean;
  customToolbar?: JSX.Element;
  children: string | JSX.Element | JSX.Element[];
  onClose: MouseEventHandler;
  size?: "small" | "medium" | "large" | "xlarge";
  isFocused?: boolean;
  setFocused: MouseEventHandler;
}

const OsWindow: FunctionComponent<OsWindowProps> = (props) => {
  const {
    title,
    position,
    withToolbar = false,
    customToolbar,
    children,
    onClose,
    size = "medium",
    isFocused,
    setFocused,
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
        default={{
          x: position.x,
          y: position.y,
          width: "auto",
          height: "auto",
        }}
        dragHandleClassName="window-title"
        enableResizing={false}
        className={`${isFocused ? "focused" : "unfocused"}`}
      >
        <Window className={`window-${size}`} onMouseDown={setFocused}>
          <WindowHeader className="window-title" active={isFocused}>
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
