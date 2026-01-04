import { useState, type FunctionComponent } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  Button,
  GroupBox,
  ScrollView,
  Tab,
  TabBody,
  Tabs,
  TreeView,
  type TreeLeaf,
} from "react95";
import { useTheme, type DefaultTheme } from "styled-components";
import OsWindow from "../../components/window/OsWindow";
import type { DefaultApplicationProps } from "../../state/applications";
import { gradientToWhite } from "../../utils/utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: "/cmaps/",
  wasmUrl: "/wasm/",
  standardFontDataUrl: "/standard_fonts/",
};

const AboutApplication: FunctionComponent<DefaultApplicationProps> = (
  props
) => {
  const { key, title, position, onClose, isFocused, setFocused } = props;

  const [activeTab, setActiveTab] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const theme = useTheme() as DefaultTheme & {
    headerBackground: string;
  };

  const handleTabChange = (value: number) => {
    setActiveTab(value);
  };

  const handleClickZoomMoins = () => {
    if (scale - 0.1 >= 0.5) setScale(scale - 0.1);
  };

  const handleClickZoomPlus = () => {
    if (scale + 0.1 <= 2.0) setScale(scale + 0.1);
  };

  const strackTree: TreeLeaf<string>[] = [
    {
      icon: "",
      id: "front",
      label: "Frontend",
      items: [
        {
          icon: "⚛️",
          id: "react",
          label: "React / Typescript",
        },
        {
          icon: "🛡️",
          id: "angular",
          label: "Angular",
        },
      ],
    },
    {
      icon: "",
      id: "back",
      label: "Backend",
      items: [
        {
          icon: "🐍",
          id: "fastapi",
          label: "FastAPI",
        },
        {
          icon: "🌱",
          id: "spring",
          label: "Spring",
        },
        {
          icon: "💾",
          id: "databases",
          label: "Bases de donnees",
          items: [
            {
              icon: "",
              id: "sql",
              label: "SQL",
              items: [
                {
                  icon: "🐬",
                  id: "mysql",
                  label: "MySQL",
                },
                {
                  icon: "🐘",
                  id: "postgres",
                  label: "PostgreSQL",
                },
              ],
            },
            {
              icon: "",
              id: "nosql",
              label: "noSQL",
              items: [
                {
                  icon: "🔋",
                  id: "dynamoDB",
                  label: "DynamoDB",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      icon: "🏢",
      id: "host",
      label: "Hebergement / infra",
      items: [
        {
          icon: "👨‍🦲",
          id: "aws",
          label: "AWS",
        },
        {
          icon: "🌍",
          id: "terraform",
          label: "Terraform",
        },
        {
          icon: "🤵",
          id: "jenkins",
          label: "Jenkins",
        },
        {
          icon: "🌐",
          id: "vps",
          label: "Administration VPS",
        },
      ],
    },
    {
      icon: "🎮",
      id: "others",
      label: "Autres",
      items: [
        {
          icon: "🌴",
          id: "lua",
          label: "FiveM (LUA)",
        },
        {
          icon: "🤖",
          id: "godot",
          label: "GODOT (game engine)",
        },
      ],
    },
  ];

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
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab value={0}>Flav</Tab>
            <Tab value={1}>Contact</Tab>
            <Tab value={2}>Stack</Tab>
            <Tab value={3}>Github</Tab>
            <Tab value={4}>CV</Tab>
          </Tabs>
          <TabBody>
            {activeTab === 0 && (
              // Flav
              <>
                <div>
                  <p>
                    Developpeur fullstack en semaine et{" "}
                    <span className="italic">binoclard</span> a toute heure,
                    Flav est le createur de FlavOS.
                  </p>
                  <p>
                    Flav est disponible par e-mail et par discord, si vous avez
                    besoin de le contacter a propos de FlavOS ou pour des
                    raisons professionnelles. Vous trouverez toutes ses
                    informations de contact dans l'onglet dedie.
                  </p>
                  <p>
                    <span className="bold italic">Binoclard</span> : Personne
                    qui se revendique comme tel, avec des hobbys niches portes
                    sur l'informatique, les jeux de role, les jeux de carte, la
                    musique... Loin d'être un terme pejoratif, il permet de
                    s'approprier le terme "nerd" en le francisant. On peut donc
                    etre un binoclard de Magic The Gathering, un binoclard de
                    musique, de Donjons et Dragon... voir le tout combine.
                  </p>
                  <p>
                    Plus d'informations sur la communaute binoclard dans
                    l'application dediee.
                  </p>
                </div>
              </>
            )}
            {activeTab === 1 && (
              // Contact
              <>
                <div>
                  <p>Vous pouvez joindre Flav par les moyens suivant :</p>
                  <p>📞 : +33 6 38 88 72 82</p>
                  <p>
                    📧 :{" "}
                    <span
                      className="link"
                      onClick={() => {
                        window.open("mailto:contact-flav-os@pm.me", "tab");
                      }}
                    >
                      contact-flav-os@pm.me
                    </span>
                  </p>
                  <p>
                    👔 :{" "}
                    <a
                      href="https://www.linkedin.com/in/flavien-belli-3b7b3b157"
                      target="_blank"
                      className="link"
                    >
                      Flavien Belli
                    </a>
                  </p>
                  <p>
                    🎮 :{" "}
                    <a
                      href="https://discord.com/users/410071811016097802"
                      target="_blank"
                      className="link"
                    >
                      Discord
                    </a>
                  </p>
                </div>
              </>
            )}
            {activeTab === 2 && (
              // Stack
              <>
                <GroupBox label="Technologies">
                  <ScrollView className="tree-container">
                    <TreeView
                      defaultExpanded={["front", "back", "host"]}
                      tree={strackTree}
                    />
                  </ScrollView>
                  <div>
                    <p>
                      Participation egalement a plusieurs projets
                      communautaires, dont notamment la communaute{" "}
                      <a href="https://www.binoclard.net/">Binoclard</a> et le
                      serveur GTA RP de la communaute de Ponce.
                    </p>
                  </div>
                </GroupBox>
              </>
            )}
            {activeTab === 3 && (
              // Github
              <>
                <div className="mb-16">
                  <p>
                    Vous pouvez retrouver mon compte github{" "}
                    <a
                      className="link"
                      target="_blank"
                      href="https://github.com/marshlyin"
                    >
                      ici
                    </a>
                    .
                  </p>
                  <p>
                    Beaucoup de projets sont cependant en prives. Il faut
                    parfois savoir garder quelques secrets ;)
                  </p>
                </div>
                <GroupBox label="Contributions">
                  <GitHubCalendar
                    showColorLegend
                    showTotalCount={false}
                    blockMargin={0}
                    blockRadius={0}
                    blockSize={12}
                    colorScheme="light"
                    username="marshlyin"
                    theme={{
                      light: gradientToWhite(theme.headerBackground), // pas d'erreur en vrai
                    }}
                  />
                </GroupBox>
              </>
            )}
            {activeTab === 4 && (
              // CV
              <>
                <ScrollView shadow className="pdf-viewer-container">
                  <Document
                    file="/docs/cv_flavien_belli.pdf"
                    options={options}
                    scale={scale}
                  >
                    <Page pageIndex={0} />
                  </Document>
                </ScrollView>
                <div className="align-right">
                  <span>{Math.floor(scale * 100)}%</span>
                </div>
                <div className="align-right">
                  <Button onClick={handleClickZoomMoins}>🔍 - </Button>{" "}
                  <Button onClick={handleClickZoomPlus}>🔍 +</Button>
                </div>
              </>
            )}
          </TabBody>
        </div>
      </OsWindow>
    </>
  );
};

export default AboutApplication;
