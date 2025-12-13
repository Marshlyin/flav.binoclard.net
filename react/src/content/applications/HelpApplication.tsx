import { type FunctionComponent, type MouseEventHandler } from "react";
import OsWindow from "../../components/window/OsWindow";
import type { WindowId } from "../../state/applications";

interface DefaultApplicationProps {
  key: WindowId;
  title: string;
  onClose: MouseEventHandler;
}

const HelpApplication: FunctionComponent<DefaultApplicationProps> = (props) => {
  const { key, title, onClose } = props;
  return (
    <>
      <OsWindow key={key} title={title} onClose={onClose} withToolbar={false}>
        <>
          Need help with the OS ? Let us show you around !
          <br />
          TODO : Phrase pour expliquer le fonctionnement et ce qu'on peut
          trouver comme chose sur le site
        </>
      </OsWindow>
    </>
  );
};

export default HelpApplication;
