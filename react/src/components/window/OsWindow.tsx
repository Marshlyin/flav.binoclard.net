import type { JSX } from "react";
import React, { useState } from "react";
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
}

const OsWindow: React.FunctionComponent<OsWindowProps> = (props) => {
  const { title, withToolbar = false, customToolbar, children } = props;
  const [isVisible, setVisible] = useState<Boolean>(true);

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
      {isVisible && (
        <Rnd dragHandleClassName="window-title">
          <Window>
            <WindowHeader className="window-title">
              {title}
              <CloseButton
                onClick={() => {
                  setVisible(false);
                }}
              />
            </WindowHeader>
            {renderToolbar()}
            <WindowContent>{children}</WindowContent>
          </Window>
        </Rnd>
      )}
    </>
  );
};

export default OsWindow;
