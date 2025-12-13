import type { FunctionComponent } from "react";
import DefaultApplication from "../content/applications/DefaultApplication";

export interface Application {
  id: WindowId;
  label: string;
  icon: string;
  component: FunctionComponent<any>;
}

export type WindowId =
  | "OS_ABOUT"
  | "OS_BINOCLARD"
  | "OS_OS"
  | "OS_CHANGELOG"
  | "OS_SETTINGS"
  | "OS_HELP"; // TODO;

export const defaultOpenedApplication: WindowId[] = ["OS_HELP"];

export const applications: Application[] = [
  { id: "OS_ABOUT", label: "About", icon: "👨‍💻", component: DefaultApplication },
  {
    id: "OS_BINOCLARD",
    label: "Binoclard",
    icon: "🤓",
    component: DefaultApplication,
  },
  { id: "OS_OS", label: "OS", icon: "🖥️", component: DefaultApplication },
  {
    id: "OS_CHANGELOG",
    label: "Changelog",
    icon: "📋",
    component: DefaultApplication,
  },
  {
    id: "OS_SETTINGS",
    label: "Settings",
    icon: "⚙️",
    component: DefaultApplication,
  },
];
