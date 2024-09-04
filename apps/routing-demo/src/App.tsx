import { Link, Outlet } from "@tanstack/react-router";

function App() {
  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", padding: 20 }}>
        <Link to="/">Home</Link>
        <Link to="/miro">Miro</Link>
        <Link to="/miro/$miroId" params={{ miroId: "xxx" }}>
          Miro xxx
        </Link>
        <Link to="/miro/$miroId" params={{ miroId: "yyy" }}>
          Miro yyy
        </Link>
        <Link
          to="/miro/$miroId/$tabId"
          params={{ miroId: "yyy", tabId: "overview" }}
        >
          Miro yyy/overview
        </Link>
        <Link
          to="/miro/$miroId/$tabId"
          params={{ miroId: "yyy", tabId: "settings" }}
        >
          Miro yyy/settings
        </Link>
      </div>
      <div>root (App)</div>
      <Outlet />
    </div>
  );
}

export default App;
