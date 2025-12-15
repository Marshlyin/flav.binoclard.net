import { type FunctionComponent, type MouseEventHandler } from "react";
import OsWindow from "../../components/window/OsWindow";
import type { WindowId } from "../../state/applications";
import { Button, GroupBox, Select } from "react95";
import themes, { type ThemeName } from "../../themes/theme";
import type { SelectOption } from "react95/dist/Select/Select.types";

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

  const themeOptions: SelectOption<ThemeName>[] = (
    Object.keys(themes) as ThemeName[]
  ).map((key) => ({
    value: key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()),
  }));

  const onChangeTheme = <T,>(selectedOption: SelectOption<T>) => {
    onSelectTheme(selectedOption.value as ThemeName);
  };

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
