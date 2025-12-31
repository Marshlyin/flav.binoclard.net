import type { FunctionComponent, MouseEventHandler } from "react";
import DefaultApplication from "../content/applications/DefaultApplication";
import HelpApplication from "../content/applications/HelpApplication";
import SettingsApplication from "../content/applications/SettingsApplication";
import AboutApplication from "../content/applications/AboutApplication";
import OSApplication from "../content/applications/OSApplication";
import type { Position } from "react-rnd";

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
  | "OS_SETTINGS"
  | "OS_HELP"
  | "OS_LOGOUT";

export const defaultOpenedApplication: WindowId[] = ["OS_HELP"];

export const applications: Application[] = [
  {
    id: "OS_ABOUT",
    label: "About",
    icon: "👨🏼‍💻",
    component: AboutApplication,
    menu_category: "Main",
    disabled: false,
  },
  {
    id: "OS_BINOCLARD",
    label: "Binoclard",
    icon: "🤓",
    component: DefaultApplication,
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
    component: DefaultApplication,
    menu_category: "Main",
    disabled: false,
  },
  {
    id: "OS_HELP",
    label: "Help",
    icon: "🛟",
    component: HelpApplication,
    menu_category: "Secondary",
    disabled: false,
  },
  {
    id: "OS_SETTINGS",
    label: "Settings",
    icon: "⚙️",
    component: SettingsApplication,
    menu_category: "Secondary",
    disabled: false,
  },
  {
    id: "OS_LOGOUT",
    label: "Logout",
    icon: "🔙",
    component: DefaultApplication,
    menu_category: "Secondary",
    disabled: true,
  },
];
