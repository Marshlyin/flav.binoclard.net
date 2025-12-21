import {
  useEffect,
  useState,
  type FunctionComponent,
  type MouseEventHandler,
} from "react";
import { Button, GroupBox, Monitor, Select } from "react95";
import type { SelectOption } from "react95/dist/Select/Select.types";
import OsWindow from "../../components/window/OsWindow";
import type { WindowId } from "../../state/applications";
import type { BackgroundsName } from "../../themes/backgrounds";
import backgrounds from "../../themes/backgrounds";
import themes, { type ThemeName } from "../../themes/theme";

interface DefaultApplicationProps {
  key: WindowId;
  title: string;
  onClose: MouseEventHandler;
  theme: ThemeName;
  onSelectTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
}

const SettingsApplication: FunctionComponent<DefaultApplicationProps> = (
  props
) => {
  const { key, title, onClose, theme, onSelectTheme } = props;

  const [bg, setBg] = useState<BackgroundsName>("defaut");

  const themeOptions: SelectOption<ThemeName>[] = (
    Object.keys(themes) as ThemeName[]
  ).map((key) => ({
    value: key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()),
  }));

  const onChangeTheme = <T,>(selectedOption: SelectOption<T>) => {
    onSelectTheme(selectedOption.value as ThemeName);
  };

  const backgroundOptions: SelectOption<BackgroundsName>[] = (
    Object.keys(backgrounds) as BackgroundsName[]
  ).map((key) => ({
    value: key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()),
  }));

  const onChangeBackground = <T,>(selectedOption: SelectOption<T>) => {
    setBg(selectedOption.value as BackgroundsName);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-background",
      backgrounds[bg]
    );
  }, [bg]);

  return (
    <>
      <OsWindow
        key={key}
        title={title}
        onClose={onClose}
        withToolbar={false}
        size="small"
      >
        <div className="mb-16">
          <GroupBox label="Fond d'ecran">
            <Monitor backgroundStyles={{ background: backgrounds[bg] }} />
            <div className="mt-16">
              <Select
                defaultValue={bg}
                options={backgroundOptions}
                menuMaxHeight={160}
                width={160}
                onChange={onChangeBackground}
              />
            </div>
          </GroupBox>
          <GroupBox label="Theme">
            <Select
              defaultValue={theme}
              options={themeOptions}
              menuMaxHeight={160}
              width={160}
              onChange={onChangeTheme}
            />
          </GroupBox>
        </div>
        <div className="align-right">
          <Button onClick={onClose}>Trop Beau !</Button>
        </div>
      </OsWindow>
    </>
  );
};

export default SettingsApplication;
