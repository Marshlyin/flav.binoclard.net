import "./styles/global.scss";
import GlobalAppStyle from "./components/GlobalAppStyle";
import OsDesktop from "./components/OsDesktop";
import OsWindow from "./components/window/OsWindow";

function App() {
  return (
    <>
      <OsDesktop>
        <GlobalAppStyle />
        <OsWindow title="pouet" withToolbar>
          Pouet pouet pouet
        </OsWindow>
      </OsDesktop>
    </>
  );
}

export default App;
