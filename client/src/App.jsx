import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex  h-screen mx-0 px-0 justify-center items-center ">
            <button className="btn btn-active">Default</button>
            <button className="btn btn-active btn-neutral">Neutral</button>
            <button className="btn btn-active btn-primary">Primary</button>
            <button className="btn btn-active btn-secondary">Secondary</button>
            <button className="btn btn-active btn-accent">Accent</button>
            <button className="btn btn-active btn-ghost">Ghost</button>
            <button className="btn btn-active btn-link">Link</button>
        </div>
    );
}

export default App;
