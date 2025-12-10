import type { FunctionComponent } from "react";
import DefaultApplication from "../content/applications/DefaultApplication";

export interface Application {
  label: string;
  icon: string;
  component: FunctionComponent<any>;
}

const applications: Application[] = [
  { label: "About", icon: "👨‍💻", component: DefaultApplication },
  { label: "Binoclard", icon: "🤓", component: DefaultApplication },
  { label: "OS", icon: "🖥️", component: DefaultApplication },
  { label: "Changelog", icon: "📋", component: DefaultApplication },
  { label: "Settings", icon: "⚙️", component: DefaultApplication },
];

export default applications;
