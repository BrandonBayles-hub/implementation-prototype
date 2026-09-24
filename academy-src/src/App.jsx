import { useEffect, useState } from "react";
import { AddCourse } from "./AddCourse.jsx";
import { MyTeam } from "./MyTeam.jsx";
import { EliteBadge } from "./kit.jsx";

const ROUTES = [
  { id: "hub", label: "Overview", hash: "#/" },
  { id: "my-team", label: "My Team", hash: "#/my-team" },
  { id: "add-course", label: "Add course", hash: "#/add-course" },
];

function routeFromHash() {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (h === "my-team") return "my-team";
  if (h === "add-course") return "add-course";
  return "hub";
}

function Hub({ go }) {
  return (
    <div className="page">
      <h1 className="page-title">Academy updates</h1>
      <p className="page-desc">Shareable Max slice. Demo data. Remind does not send email.</p>
      <div className="demo-note">
        Not on product-vision. Academy Elite is on by default (toggle in the header).
        Add course maps content type → player format 1:1 — a PDF is <code>format: "pdf"</code>, not SCORM.
      </div>
      <div className="hub-grid">
        <button type="button" className="hub-card" onClick={() => go("my-team")}>
          <div className="row"><h2>My Team</h2><EliteBadge /></div>
          <p>Overdue / not-started roster. Remind with editable email + copy, and in-app as a system-alert preview.</p>
        </button>
        <button type="button" className="hub-card" onClick={() => go("add-course")}>
          <div className="row"><h2>Add course</h2><EliteBadge /></div>
          <p>Custom types: SCORM, PDF, Video, Job aid, Link. Format follows uploadKind — no hardcoded SCORM.</p>
        </button>
      </div>
    </div>
  );
}

export function App() {
  const [route, setRoute] = useState(routeFromHash);
  const [elite, setElite] = useState(true);

  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) window.location.hash = "#/";
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (id) => {
    const next = ROUTES.find((r) => r.id === id);
    window.location.hash = next ? next.hash : "#/";
  };

  return (
    <div className="app">
      <header className="chrome">
        <div className="chrome-brand">Max · Academy</div>
        <nav className="chrome-nav">
          {ROUTES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`chrome-link ${route === r.id ? "active" : ""}`}
              onClick={() => go(r.id)}
            >
              {r.label}
            </button>
          ))}
        </nav>
        <div className="chrome-meta">
          <span>Academy tier</span>
          <button type="button" className="chrome-link active" onClick={() => setElite((v) => !v)}>
            {elite ? "Elite" : "Basic"}
          </button>
        </div>
      </header>
      {route === "my-team" ? <MyTeam elite={elite} /> : route === "add-course" ? <AddCourse elite={elite} /> : <Hub go={go} />}
    </div>
  );
}
