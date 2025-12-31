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
              <div>
                <p>
                  Sit magna ut non veniam commodo qui voluptate in consectetur
                  proident tempor aute ipsum.
                </p>
                <p>
                  Sit magna ut non veniam commodo qui voluptate in consectetur
                  proident tempor aute ipsum.
                </p>
                <p>
                  Sit magna ut non veniam commodo qui voluptate in consectetur
                  proident tempor aute ipsum.
                </p>
                <p>
                  Sit magna ut non veniam commodo qui voluptate in consectetur
                  proident tempor aute ipsum.
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
