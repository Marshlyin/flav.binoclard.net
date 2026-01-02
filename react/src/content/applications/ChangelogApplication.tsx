import { useState, type FunctionComponent } from "react";
import { Tab, TabBody, Tabs } from "react95";
import OsWindow from "../../components/window/OsWindow";
import type { DefaultApplicationProps } from "../../state/applications";

const ChangelogApplication: FunctionComponent<DefaultApplicationProps> = (
  props
) => {
  const { key, title, position, onClose, isFocused, setFocused } = props;

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (value: number) => {
    setActiveTab(value);
  };

  return (
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
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab value={0}>1.0.0</Tab>
          <Tab value={1}>0.2.0</Tab>
          <Tab value={2}>0.1.1</Tab>
          <Tab value={3}>0.1.0</Tab>
        </Tabs>
        <TabBody>
          {activeTab === 0 && (
            // Flav
            <>
              <div className="ml-8 italic">
                <p>
                  - Refonte visuelle de l'OS : utilisation du nouveau
                  peripherique "souris"
                </p>
                <p>
                  - Gestion des themes visuels et de la personnalisation de l'OS
                </p>
                <p>
                  - Mise en place du visualisateur du CV dans l'application A
                  propos
                </p>
                <p>- Ajout d'informations et de nouvelles applications</p>
              </div>
            </>
          )}
          {activeTab === 1 && (
            // v0.2.0
            <>
              <div className="ml-8 italic">
                <p>
                  - Fix error input avec un clavier autre que QWERTY (oui c'est
                  possible)
                </p>
                <p>
                  - Les entrees claviers comme Alt, VerMaj, etc, ne s'affichent
                  plus dans la console
                </p>
                <p>- L'usage du CPU a ete reduit</p>
                <p>- La fonction CLS existe vraiment</p>
              </div>
            </>
          )}
          {activeTab === 2 && (
            // v0.1.1
            <>
              <div className="ml-8 italic">
                <p>- Ajout du changelog</p>
                <p>- Ajout de la commande binoclard</p>
                <p>- Ajout de la sous commande /github dans about </p>
                <p>- Suppression de characteres non interpretes</p>
              </div>
            </>
          )}
          {activeTab === 3 && (
            // v0.1.0
            <>
              <div className="ml-8 italic">
                <p>- Creation du FlavOS</p>
                <p>- Ajout des commandes about, os et cls et sous commandes</p>
              </div>
            </>
          )}
        </TabBody>
      </>
    </OsWindow>
  );
};

export default ChangelogApplication;
