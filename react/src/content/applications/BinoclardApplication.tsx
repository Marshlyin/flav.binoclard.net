import type { FunctionComponent } from "react";
import type { DefaultApplicationProps } from "../../state/applications";
import OsWindow from "../../components/window/OsWindow";

const BinoclardApplication: FunctionComponent<DefaultApplicationProps> = (
  props
) => {
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
        <>
          <div className="mb-16">
            <p className="bold">Binoclard | Kezako ?</p>
            <p>
              Les <span className="bold italic">Binoclards</span> sont une
              micro-communaute d'amis, de bidouilleurs qui cherchent a s'amuser
              et et creer en dehors des geants du web via de nombreux services
              autoheberges.
            </p>
            <p>
              L'objectif de ce projet est de developper un ecosysteme
              d'applications gratuites pour repondre aux besoins de la
              communaute, en protegant au maximum les donnees de chacuns et en
              privilegiant les logiciels libres.
            </p>
            <p>Parmis les services proposes, on retrouve : </p>
            <div className="ml-16">
              <p>- Streaming video</p>
              <p>- irc</p>
              <p>- TeamSpeak</p>
              <p>- Mealie (Livre de recette)</p>
              <p>- Recommandations musicales</p>
              <p>- BinoclardBox (un partage de fichier temporaire)</p>
              <p>- Gitea</p>
              <p>- et plein d'autres choses !</p>
            </div>
          </div>
          <div className="flex justify-space-between">
            <p>
              Plus d'info sur le projet sur{" "}
              <a href="https://www.binoclard.net" className="link">
                binoclard.net
              </a>
            </p>
            <img
              alt="banner bonjour-binoclard"
              src="/img/bonjour-binoclard.png"
            />
          </div>
        </>
      </OsWindow>
    </>
  );
};

export default BinoclardApplication;
