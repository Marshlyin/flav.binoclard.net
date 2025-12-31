import { useEffect, useState, type FunctionComponent } from "react";
import { Button, GroupBox, ScrollView, Tab, TabBody, Tabs } from "react95";
import OsWindow from "../../components/window/OsWindow";
import type { DefaultApplicationProps } from "../../state/applications";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { GitHubCalendar } from "react-github-calendar";
import { gradientToWhite } from "../../utils/utils";
import { useTheme, type DefaultTheme } from "styled-components";

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

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  const handleTabChange = (value: number) => {
    setActiveTab(value);
  };

  const handleClickZoomMoins = () => {
    if (scale - 0.1 >= 0.5) setScale(scale - 0.1);
  };

  const handleClickZoomPlus = () => {
    if (scale + 0.1 <= 2.0) setScale(scale + 0.1);
  };

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
            <Tab value={1}>Stack</Tab>
            <Tab value={2}>Contact</Tab>
            <Tab value={3}>Github</Tab>
            <Tab value={4}>CV</Tab>
          </Tabs>
          <TabBody>
            {activeTab === 0 && (
              // Flav
              <>
                <div>
                  <p>
                    Developpeur web fullstack en semaine et binoclard à toute
                    heure, Flav est le createur de FlavOS.
                  </p>
                  <p>
                    Flav est disponible par e-mail et par discord, si vous avez
                    besoin de le contacter à propos de FlavOS ou pour des
                    raisons professionnelles.
                  </p>
                </div>
              </>
            )}
            {activeTab === 1 && (
              // Stack
              <>
                <div>
                  <p>
                    Developpeur web fullstack en semaine et binoclard à toute
                    heure, Flav est le createur de FlavOS.
                  </p>
                  <p>
                    Flav est disponible par e-mail et par discord, si vous avez
                    besoin de le contacter à propos de FlavOS ou pour des
                    raisons professionnelles.
                  </p>
                </div>
              </>
            )}
            {activeTab === 2 && (
              // Contact
              <>
                <div>
                  <p>
                    Developpeur web fullstack en semaine et binoclard à toute
                    heure, Flav est le createur de FlavOS.
                  </p>
                  <p>
                    Flav est disponible par e-mail et par discord, si vous avez
                    besoin de le contacter à propos de FlavOS ou pour des
                    raisons professionnelles.
                  </p>
                </div>
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
                  <Button onClick={handleClickZoomMoins}>Zoom -</Button> /{" "}
                  <Button onClick={handleClickZoomPlus}>Zoom +</Button>
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
