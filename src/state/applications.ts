import type { FunctionComponent, MouseEventHandler } from "react";
import DefaultApplication from "../content/applications/DefaultApplication";
import HelpApplication from "../content/applications/HelpApplication";
import SettingsApplication from "../content/applications/SettingsApplication";
import AboutApplication from "../content/applications/AboutApplication";
import OSApplication from "../content/applications/OSApplication";
import type { Position } from "react-rnd";
import BinoclardApplication from "../content/applications/BinoclardApplication";
import ChangelogApplication from "../content/applications/ChangelogApplication";
import TerminalApplication from "../content/applications/TerminalApplication";

export interface Application {
  id: WindowId;
  label: string;
  icon: string;
  component: FunctionComponent<any>;
  menu_category: MenuCategory;
  disabled: boolean;
}

export interface DefaultApplicationProps {
  key: WindowId;
  position: Position;
  title: string;
  onClose: MouseEventHandler;
  isFocused?: boolean;
  setFocused: MouseEventHandler;
}

export type MenuCategory = "Main" | "Secondary";

export type WindowId =
  | "OS_ABOUT"
  | "OS_BINOCLARD"
  | "OS_OS"
  | "OS_CHANGELOG"
  | "OS_CONSOLE"
  | "OS_SETTINGS"
  | "OS_HELP"
  | "OS_LOGOUT";

export const defaultOpenedApplication: WindowId[] = ["OS_HELP"];

export const applications: Application[] = [
  {
    id: "OS_ABOUT",
    label: "A propos",
    icon: "👨🏼‍💻",
    component: AboutApplication,
    menu_category: "Main",
    disabled: false,
  },
  {
    id: "OS_BINOCLARD",
    label: "Binoclard",
    icon: "🤓",
    component: BinoclardApplication,
    menu_category: "Main",
    disabled: false,
  },
  {
    id: "OS_OS",
    label: "OS",
    icon: "🖥️",
    component: OSApplication,
    menu_category: "Main",
    disabled: false,
  },
  {
    id: "OS_CHANGELOG",
    label: "Changelog",
    icon: "📋",
    component: ChangelogApplication,
    menu_category: "Main",
    disabled: false,
  },
  {
    id: "OS_CONSOLE",
    label: "Console",
    icon: "💲",
    component: TerminalApplication,
    menu_category: "Main",
    disabled: false,
  },
  {
    id: "OS_HELP",
    label: "Aide",
    icon: "🛟",
    component: HelpApplication,
    menu_category: "Secondary",
    disabled: false,
  },
  {
    id: "OS_SETTINGS",
    label: "Parametres",
    icon: "⚙️",
    component: SettingsApplication,
    menu_category: "Secondary",
    disabled: false,
  },
  {
    id: "OS_LOGOUT",
    label: "Deconnexion",
    icon: "🔙",
    component: DefaultApplication,
    menu_category: "Secondary",
    disabled: true,
  },
];
