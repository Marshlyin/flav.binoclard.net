import { type FunctionComponent } from "react";
import { Button } from "react95";
import OsWindow from "../../components/window/OsWindow";
import type { DefaultApplicationProps } from "../../state/applications";

const HelpApplication: FunctionComponent<DefaultApplicationProps> = (props) => {
  const { key, title, position, onClose, isFocused, setFocused } = props;
  return (
    <>
      <OsWindow
        key={key}
        title={title}
        position={position}
        onClose={onClose}
        withToolbar={false}
        size="large"
        isFocused={isFocused}
        setFocused={setFocused}
      >
        <div className="mb-16">
          <p>Besoin d'aide avec FlavOS ? Laissez nous vous guider !</p>
          <p>
            Les differentes applications de FlavOS se trouvent dans le menu
            Demarrer.
          </p>
          <p>
            Ici, vous pourrez trouver des informations sur Flav, l'OS, le
            collectif Binoclard et bien d'autres choses !{" "}
          </p>
          <p>
            Vous pourrez egalement modifier les themes pour mettre FlavOS à
            votre gout !
          </p>
        </div>
        <div className="align-right">
          <Button onClick={onClose}>Super !</Button>
        </div>
      </OsWindow>
    </>
  );
};

export default HelpApplication;
