import { type FunctionComponent, type MouseEventHandler } from "react";
import OsWindow from "../../components/window/OsWindow";
import type { WindowId } from "../../state/applications";
import type { Position } from "../../state/position";

interface DefaultApplicationProps {
  key: WindowId;
  position: Position;
  title: string;
  onClose: MouseEventHandler;
  isFocused?: boolean;
  setFocused: MouseEventHandler;
}

const DefaultApplication: FunctionComponent<DefaultApplicationProps> = (
  props
) => {
  const { key, position, title, onClose, isFocused, setFocused } = props;
  return (
    <>
      <OsWindow
        key={key}
        title={title}
        position={position}
        onClose={onClose}
        withToolbar={true}
        isFocused={isFocused}
        setFocused={setFocused}
        size="medium"
      >
        <>
          Nulla elit dolor consectetur minim est sunt sint
          <br />
          minim sint tempor dolor amet. <br />
          Anim aute elit mollit anim mollit Lorem duis enim laboris. <br />
          Magna do et aliquip magna.
        </>
      </OsWindow>
    </>
  );
};

export default DefaultApplication;
