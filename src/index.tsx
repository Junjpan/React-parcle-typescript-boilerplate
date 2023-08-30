import { createRoot } from "react-dom/client";
import App from "./App/app";
import "./styles/index.scss";

const container = document.getElementById("app");
const root = createRoot(container as HTMLElement);
root.render(<App />);
