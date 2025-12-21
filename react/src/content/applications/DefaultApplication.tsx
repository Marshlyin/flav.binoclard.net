import { type FunctionComponent, type MouseEventHandler } from "react";
import OsWindow from "../../components/window/OsWindow";
import type { WindowId } from "../../state/applications";

interface DefaultApplicationProps {
  key: WindowId;
  title: string;
  onClose: MouseEventHandler;
  isFocused?: boolean;
  setFocused: MouseEventHandler;
}

const DefaultApplication: FunctionComponent<DefaultApplicationProps> = (
  props
) => {
  const { key, title, onClose, isFocused, setFocused } = props;
  return (
    <>
      <OsWindow
        key={key}
        title={title}
        onClose={onClose}
        withToolbar={true}
        isFocused={isFocused}
        setFocused={setFocused}
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
