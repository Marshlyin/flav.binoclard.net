import GlobalAppStyle from "./components/GlobalAppStyle";
import OsDesktop from "./components/OsDesktop";
import "./styles/global.scss";

function App() {
  return (
    <>
      <OsDesktop>
        <GlobalAppStyle />
      </OsDesktop>
    </>
  );
}

export default App;
