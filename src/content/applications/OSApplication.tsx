import { useState, type FunctionComponent } from "react";
import OsWindow from "../../components/window/OsWindow";
import type { DefaultApplicationProps } from "../../state/applications";
import { OS_BUILD, OS_VERSION } from "../../state/version";
import { Separator } from "react95";

const OSApplication: FunctionComponent<DefaultApplicationProps> = (props) => {
  const { key, title, position, onClose, isFocused, setFocused } = props;
  const [seeMore, setSeeMore] = useState<boolean>(false);
  return (
    <>
      <OsWindow
        key={key}
        title={title}
        position={position}
        onClose={onClose}
        withToolbar={false}
        size="medium"
        isFocused={isFocused}
        setFocused={setFocused}
      >
        <div>
          <p>
            FlavOS : ver {OS_VERSION}, build {OS_BUILD}
          </p>
          <p>(c) Binoclard Inc. {new Date().getFullYear()}</p>
          <p>Construit avec React et React95.</p>
          {!seeMore && (
            <span
              className="link"
              onClick={() => {
                setSeeMore(true);
              }}
            >
              Voir plus
            </span>
          )}
          {seeMore && (
            <>
              <Separator />
              <div className="mt-16">
                <p className="bold">Pourquoi FlavOS ?</p>
                <p>
                  Windows 95 est le premier systeme d'exploitation que j'ai
                  connu. L'esthetique grise, austere, fait partie integrante de
                  mon initiation a l'informatique, a l'epoque ou les OS
                  n'etaient pas encore bourres de pub et de trackers, et
                  servaient directement a liberer toute la creativite des
                  utilisateurs sans contrepartie.
                </p>
                <p>
                  Ayant deserte Windows depuis quelques annees, je rend lui rend
                  cependant hommage via l'interface de ce site. Rassurez-vous,
                  aucun tracker n'est present sur ce site (encore heureux).
                </p>
              </div>
              <div className="mt-8">
                <p className="bold">Comment est fait FlavOS ?</p>
                <p>
                  Base sur{" "}
                  <a
                    href="https://github.com/bokuweb/react-rnd"
                    target="_blank"
                  >
                    React-Rnd
                  </a>{" "}
                  et
                  <a
                    href="https://github.com/react95-io/React95"
                    target="_blank"
                  >
                    React95
                  </a>{" "}
                  (une librairie de componsants React permettant de simuler un
                  environnement de bureau Windows95), ce site cherche a garder
                  l'architecture et la rigueur des projets auquels j'ai pu
                  participer, tout en restant suffisament simple pour ce qu'il
                  est. Un composant parent, l'OS, gere l'etat de toutes les
                  "applications", et ces dernieres peuvent interagir entre elle
                  grace a des fonctions de l'OS. Simple non ?
                </p>
              </div>
              <div>
                <span
                  className="link"
                  onClick={() => {
                    setSeeMore(false);
                  }}
                >
                  Fermer
                </span>
              </div>
            </>
          )}
        </div>
      </OsWindow>
    </>
  );
};

export default OSApplication;
