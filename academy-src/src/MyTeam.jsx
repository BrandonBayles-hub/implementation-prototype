import { useMemo, useState } from "react";
import { Bell, Check, ChevronDown, ChevronRight, ChevronUp, Copy, FileText, Search, X } from "lucide-react";
import {
  TEAM_MEMBERS,
  assignedCourseSummary,
  dueSoonCourseCount,
  fmtDate,
  initialsFor,
  memberExceptionKind,
  memberHasNotStartedOnly,
  memberHasOverdue,
  notStartedOpenCount,
  overdueCourseCount,
} from "./data.js";
import { AlertBanner, Badge, Button, Dialog, EliteBadge, Field, Toast, ToggleGroup } from "./kit.jsx";

function defaultDueTrainingInApp(courseCount, overdueCount) {
  const courseWord = `assigned course${courseCount !== 1 ? "s" : ""}`;
  const overdueBit =
    overdueCount > 0 ? ` ${overdueCount} ${overdueCount === 1 ? "is" : "are"} overdue.` : "";
  return {
    title: `You have ${courseCount} ${courseWord} that need attention.${overdueBit}`,
    description: "Complete them on My Learning.",
  };
}

function MemberCard({ member, isNudged, isExpanded, onToggle, onNudge, recordedReminder, courseFilter }) {
  const now = Date.now();
  const overdueCount = overdueCourseCount(member);
  const notStartedCount = notStartedOpenCount(member);
  const dueSoonCount = dueSoonCourseCount(member, now);
  const incompleteCourses = member.courses
    .filter((c) => c.status !== "completed")
    .sort((a, b) => (a.isOverdue && a.category === "compliance" ? 0 : a.isOverdue ? 1 : 2) - (b.isOverdue && b.category === "compliance" ? 0 : b.isOverdue ? 1 : 2));
  const firstName = member.name.split(" ")[0];
  const memberEmail = `${member.name.toLowerCase().replace(/\s+/g, ".")}@property.com`;
  const courseLines = incompleteCourses
    .map((c) => {
      const dueStr = c.isOverdue
        ? "Overdue"
        : c.dueDate
          ? `Due ${new Date(`${c.dueDate}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
          : "Due soon";
      return `• ${c.title} — ${dueStr}`;
    })
    .join("\n");
  const defaultMsg = [
    `Hi ${firstName},`,
    "",
    `You have ${incompleteCourses.length} course(s) that need your attention:`,
    courseLines,
    "",
    "Please complete these at your earliest convenience.",
    "",
    "Thanks,",
  ].join("\n");
  const defaultInApp = defaultDueTrainingInApp(incompleteCourses.length, overdueCount);
  const subjectLine = `Training reminder — ${incompleteCourses.length} course(s) need your attention`;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [channels, setChannels] = useState(recordedReminder?.channels ?? { email: true, inApp: true });
  const [emailSubject, setEmailSubject] = useState(recordedReminder?.emailSubject ?? subjectLine);
  const [emailBody, setEmailBody] = useState(recordedReminder?.emailBody ?? defaultMsg);
  const [inAppTitle, setInAppTitle] = useState(recordedReminder?.inAppTitle ?? defaultInApp.title);
  const [inAppDescription, setInAppDescription] = useState(recordedReminder?.inAppDescription ?? defaultInApp.description);
  const [copied, setCopied] = useState(false);

  function hydrate(from) {
    setChannels(from?.channels ?? { email: true, inApp: true });
    setEmailSubject(from?.emailSubject ?? subjectLine);
    setEmailBody(from?.emailBody ?? defaultMsg);
    setInAppTitle(from?.inAppTitle ?? defaultInApp.title);
    setInAppDescription(from?.inAppDescription ?? defaultInApp.description);
  }

  const sortedCourses = [...member.courses].sort((a, b) => {
    const score = (c) => {
      if (c.isOverdue && c.category === "compliance") return 0;
      if (c.isOverdue) return 1;
      const dueMs = c.dueDate ? new Date(`${c.dueDate}T00:00:00`).getTime() : null;
      if (dueMs && dueMs > now && dueMs - now <= 7 * 86400000) return 2;
      if (c.status === "in_progress") return 3;
      if (c.status === "not_started") return 4;
      return 5;
    };
    return score(a) - score(b);
  });

  return (
    <div className="member">
      <div
        className="member-head"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} courses for ${member.name}`}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <span className="muted">{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
        <div className="avatar">{initialsFor(member.name)}</div>
        <div className="grow">
          <p style={{ fontWeight: 500 }}>
            {member.name} <span className="muted" style={{ fontWeight: 400 }}>— {member.role}</span>
          </p>
          <p className="xs muted">· {member.propertyName}</p>
          <p className="xs muted" style={{ marginTop: 2 }}>Assigned: {assignedCourseSummary(member)}</p>
        </div>
        <div className="row">
          {overdueCount > 0 && <Badge tone="danger">{overdueCount} overdue</Badge>}
          {overdueCount === 0 && notStartedCount > 0 && <Badge tone="warning">{notStartedCount} not started</Badge>}
          {overdueCount === 0 && notStartedCount === 0 && dueSoonCount > 0 && <span className="xs muted">{dueSoonCount} due soon</span>}
          {overdueCount === 0 && notStartedCount === 0 && dueSoonCount === 0 && <span className="xs muted">All complete</span>}
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {incompleteCourses.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              aria-label={isNudged ? `View recorded reminder for ${member.name} in this prototype` : `Record a reminder for ${member.name} in this prototype`}
              onClick={() => {
                hydrate(recordedReminder);
                setDialogOpen(true);
              }}
            >
              {isNudged ? <Check size={14} /> : <Bell size={14} />}
              {isNudged ? "Reminded" : "Remind"}
            </Button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div style={{ borderTop: "1px solid hsl(var(--border))", background: "hsl(var(--muted) / 0.15)", padding: "8px 16px 16px" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedCourses.map((c) => {
                const dueMs = c.dueDate ? new Date(`${c.dueDate}T00:00:00`).getTime() : null;
                const daysUntil = dueMs != null ? Math.round((dueMs - now) / 86400000) : null;
                const match = courseFilter.trim() && c.title.toLowerCase().includes(courseFilter.trim().toLowerCase());
                let statusEl;
                if (c.isOverdue) statusEl = <span className="danger-text">! Overdue</span>;
                else if (daysUntil != null && daysUntil >= 0 && daysUntil <= 7) {
                  statusEl = <span className="muted">{daysUntil === 0 ? "Due today" : `Due in ${daysUntil} day${daysUntil !== 1 ? "s" : ""}`}</span>;
                } else if (c.status === "in_progress") statusEl = <span>In progress</span>;
                else if (c.status === "completed") statusEl = <span className="muted">Completed</span>;
                else statusEl = <span className="muted">Not started</span>;
                return (
                  <tr key={c.courseId} className={c.status === "completed" && !match ? "completed" : ""}>
                    <td style={{ fontWeight: match ? 600 : 500 }}>{c.title}</td>
                    <td className="muted">{c.category === "compliance" ? "Compliance" : "Standard"}</td>
                    <td className={c.isOverdue ? "danger-text" : "muted"}>{fmtDate(c.dueDate)}</td>
                    <td>{statusEl}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          hydrate(recordedReminder);
          setCopied(false);
        }}
        title={`Remind ${member.name}`}
        description="Records the reminder in this prototype. No email or in-app notification is sent."
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                hydrate(recordedReminder);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={!channels.email && !channels.inApp}
              title={!channels.email && !channels.inApp ? "Select at least one channel" : undefined}
              onClick={() => {
                onNudge(member, { memberId: member.id, channels, emailSubject, emailBody, inAppTitle, inAppDescription });
                setDialogOpen(false);
              }}
            >
              Record reminder
            </Button>
          </>
        }
      >
        <div className="stack">
          <label className="check">
            <input type="checkbox" checked={channels.email} onChange={() => setChannels((p) => ({ ...p, email: !p.email }))} />
            Email <span className="xs muted">({memberEmail})</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={channels.inApp} onChange={() => setChannels((p) => ({ ...p, inApp: !p.inApp }))} />
            In-app
          </label>

          {channels.email && (
            <section aria-label="Email" className="stack">
              <Field label="To">
                <input className="input" readOnly value={memberEmail} aria-readonly="true" />
              </Field>
              <Field label="Subject">
                <input className="input" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
              </Field>
              <Field
                label="Message"
                extra={
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={copied ? "Copied" : "Copy message"}
                    onClick={() => {
                      void navigator.clipboard?.writeText(emailBody).then(() => {
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 1600);
                      });
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                }
              >
                <textarea className="textarea" rows={Math.max(emailBody.split("\n").length, 8)} value={emailBody} onChange={(e) => setEmailBody(e.target.value)} />
              </Field>
            </section>
          )}

          {channels.inApp && (
            <section aria-label="In-app" className="stack">
              <Field label="Title">
                <input className="input" value={inAppTitle} onChange={(e) => setInAppTitle(e.target.value)} />
              </Field>
              <Field label="Description">
                <textarea className="textarea" rows={2} value={inAppDescription} onChange={(e) => setInAppDescription(e.target.value)} />
              </Field>
              <AlertBanner tone="warning" title={inAppTitle} description={inAppDescription} />
              <p className="hint">Shows in the page-top alert on their Dashboard.</p>
            </section>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export function MyTeam({ elite }) {
  const [nudged, setNudged] = useState(new Set());
  const [records, setRecords] = useState({});
  const [toast, setToast] = useState(null);
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("overdue");
  const [memberSearch, setMemberSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [report, setReport] = useState(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerSent, setBannerSent] = useState(false);
  const [bannerChannels, setBannerChannels] = useState({ email: true, inApp: true });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [linksCopied, setLinksCopied] = useState(false);

  const scoped = TEAM_MEMBERS;
  const overdueMembers = useMemo(() => scoped.filter(memberHasOverdue), [scoped]);
  const overdueItemCount = useMemo(() => scoped.reduce((n, m) => n + overdueCourseCount(m), 0), [scoped]);
  const notStartedOnly = useMemo(() => scoped.filter(memberHasNotStartedOnly), [scoped]);
  const propertyFiltered = propertyFilter === "all" ? scoped : scoped.filter((m) => m.propertyId === propertyFilter);
  const chipCounts = useMemo(() => {
    const overdue = propertyFiltered.filter(memberHasOverdue).length;
    const notStarted = propertyFiltered.filter(memberHasNotStartedOnly).length;
    const dueSoon = propertyFiltered.filter((m) => memberExceptionKind(m) === "due-soon").length;
    return {
      all: propertyFiltered.length,
      overdue,
      "not-started": notStarted,
      "due-soon": dueSoon,
      complete: propertyFiltered.length - overdue - notStarted - dueSoon,
    };
  }, [propertyFiltered]);

  const filtered = useMemo(() => {
    let ms = propertyFiltered;
    if (statusFilter !== "all") ms = ms.filter((m) => memberExceptionKind(m) === statusFilter);
    if (memberSearch.trim()) {
      const q = memberSearch.trim().toLowerCase();
      ms = ms.filter((m) => m.name.toLowerCase().includes(q));
    }
    if (courseFilter.trim()) {
      const cq = courseFilter.trim().toLowerCase();
      ms = ms.filter((m) => m.courses.some((c) => c.title.toLowerCase().includes(cq)));
    }
    return ms;
  }, [propertyFiltered, statusFilter, memberSearch, courseFilter]);

  const sorted = useMemo(() => {
    const rank = { overdue: 0, "not-started": 1, "due-soon": 2, complete: 3 };
    return [...filtered].sort((a, b) => {
      const ka = memberExceptionKind(a);
      const kb = memberExceptionKind(b);
      if (ka !== kb) return rank[ka] - rank[kb];
      if (ka === "overdue") return overdueCourseCount(b) - overdueCourseCount(a);
      return a.name.localeCompare(b.name);
    });
  }, [filtered]);

  const props = Object.fromEntries(scoped.map((m) => [m.propertyId, m.propertyName]));
  const courseTitles = [...new Set(scoped.flatMap((m) => m.courses.map((c) => c.title)))].sort();

  if (!elite) {
    return (
      <div className="page">
        <h1 className="page-title">My Learning</h1>
        <p className="page-desc">My Team is Academy Elite. Switch the header toggle to Elite to open the roster.</p>
        <div className="card card-pad" style={{ marginTop: 16 }}>
          <div className="row">
            <EliteBadge />
            <strong>My Team requires Elite</strong>
          </div>
          <p className="hint" style={{ marginTop: 8 }}>
            Managers see overdue and not-started exceptions, then record a reminder. Demo data — no email is sent.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="row">
        <h1 className="page-title">My Learning</h1>
        <EliteBadge />
      </div>
      <p className="page-desc">My Team · Regional manager · 2027 Elite. Demo data. Remind records locally — no email is sent.</p>

      <div className="stack" style={{ marginTop: 16 }}>
        <ToggleGroup
          value="my-team"
          onChange={() => {}}
          aria-label="My Learning view"
          options={[
            { value: "my-courses", label: "My Courses" },
            { value: "my-team", label: "My Team", count: overdueMembers.length },
          ]}
        />

        {!bannerSent && (overdueMembers.length > 0 || notStartedOnly.length > 0) && (
          <AlertBanner
            tone={overdueMembers.length > 0 ? "danger" : "warning"}
            title={
              overdueMembers.length > 0
                ? `${overdueMembers.length} team members have ${overdueItemCount} overdue courses.${
                    notStartedOnly.length > 0
                      ? ` ${notStartedOnly.length} more have assigned training with no progress.`
                      : ""
                  }`
                : `${notStartedOnly.length} team members have assigned training with no progress.`
            }
            action={
              overdueMembers.length > 0 ? (
                <Button variant="outline" size="sm" onClick={() => setBannerOpen(true)}>
                  Remind overdue
                </Button>
              ) : null
            }
          />
        )}
        {bannerSent && (
          <AlertBanner
            tone="success"
            title={`Reminders recorded for ${overdueMembers.length} team members in this prototype. No email was sent.`}
          />
        )}

        <div className="row">
          <select className="select" style={{ width: 260 }} value={propertyFilter} onChange={(e) => setPropertyFilter(e.target.value)} aria-label="Scope">
            <option value="all">All Properties</option>
            {Object.entries(props).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
          <ToggleGroup
            value={statusFilter}
            onChange={setStatusFilter}
            aria-label="Status filter"
            options={[
              { value: "all", label: "All", count: chipCounts.all },
              { value: "overdue", label: "Overdue", count: chipCounts.overdue },
              { value: "not-started", label: "Not started", count: chipCounts["not-started"] },
              { value: "due-soon", label: "Due soon", count: chipCounts["due-soon"] },
              { value: "complete", label: "Complete", count: chipCounts.complete },
            ]}
          />
          {propertyFilter !== "all" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const members = scoped.filter((m) => m.propertyId === propertyFilter);
                setReport({ propertyName: props[propertyFilter], members });
              }}
            >
              <FileText size={14} /> Report
            </Button>
          )}
          <div className="ml-auto row">
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 8, top: 9, color: "hsl(var(--muted-foreground))" }} />
              <input className="input input-sm" style={{ width: 180, paddingLeft: 28 }} placeholder="Search members..." value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)} />
            </div>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 8, top: 9, color: "hsl(var(--muted-foreground))" }} />
              <input
                className="input input-sm"
                style={{ width: 200, paddingLeft: 28 }}
                list="course-titles"
                placeholder="Course: Search courses..."
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                aria-label="Filter by course name"
              />
              {courseFilter && (
                <button type="button" className="btn btn-ghost btn-sm" style={{ position: "absolute", right: 2, top: 2 }} onClick={() => setCourseFilter("")} aria-label="Clear course filter">
                  <X size={12} />
                </button>
              )}
              <datalist id="course-titles">
                {courseTitles.map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="card empty">No team members match. Adjust the filters above to see your team.</div>
        ) : (
          <div className="stack" style={{ gap: 6 }}>
            {sorted.map((m) => (
              <MemberCard
                key={m.id}
                member={m}
                isNudged={nudged.has(m.id)}
                isExpanded={expanded === m.id || courseFilter.trim() !== ""}
                onToggle={() => setExpanded((prev) => (prev === m.id ? null : m.id))}
                recordedReminder={records[m.id]}
                courseFilter={courseFilter}
                onNudge={(member, record) => {
                  setNudged((prev) => new Set([...prev, member.id]));
                  setRecords((prev) => ({ ...prev, [member.id]: record }));
                  setToast(`Reminder recorded for ${member.name} in this prototype. No email was sent.`);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={bannerOpen}
        onClose={() => {
          setBannerOpen(false);
          setBannerChannels({ email: true, inApp: true });
          setPreviewOpen(false);
        }}
        title="Remind all overdue team members?"
        description="Records the reminders in this prototype. No email or in-app notification is sent."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              style={{ marginRight: "auto" }}
              onClick={() => {
                const all = overdueMembers.map((m) => `${m.name}: https://app.entrata.com/academy/my-learning?member=${m.id}`).join("\n");
                navigator.clipboard.writeText(all);
                setLinksCopied(true);
                setTimeout(() => setLinksCopied(false), 2000);
              }}
            >
              {linksCopied ? "Copied!" : "Copy All Links"}
            </Button>
            <Button variant="outline" onClick={() => setBannerOpen(false)}>Cancel</Button>
            <Button
              disabled={!bannerChannels.email && !bannerChannels.inApp}
              onClick={() => {
                setNudged((prev) => {
                  const next = new Set(prev);
                  overdueMembers.forEach((m) => next.add(m.id));
                  return next;
                });
                setBannerOpen(false);
                setBannerSent(true);
                setToast(`Reminders recorded for ${overdueMembers.length} team members in this prototype. No email was sent.`);
              }}
            >
              {`Record reminders (${overdueMembers.length})`}
            </Button>
          </>
        }
      >
        <p className="xs muted">Record a reminder for {overdueMembers.length} team members with overdue training.</p>
        <p className="hint" style={{ margin: "12px 0 8px" }}>Intended channels (not sent)</p>
        <label className="check">
          <input type="checkbox" checked={bannerChannels.email} onChange={() => setBannerChannels((p) => ({ ...p, email: !p.email }))} />
          Email
        </label>
        <label className="check">
          <input type="checkbox" checked={bannerChannels.inApp} onChange={() => setBannerChannels((p) => ({ ...p, inApp: !p.inApp }))} />
          In-App Notification
        </label>
        <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={() => setPreviewOpen((p) => !p)} aria-expanded={previewOpen}>
          <ChevronRight size={14} style={{ transform: previewOpen ? "rotate(90deg)" : undefined }} />
          Preview Recipients
        </button>
        {previewOpen && (
          <ul className="xs muted" style={{ marginTop: 8, padding: "8px 12px", border: "1px solid hsl(var(--border))", borderRadius: 6, maxHeight: 160, overflow: "auto" }}>
            {overdueMembers.map((m) => (
              <li key={m.id}>{m.name} — {m.courses.filter((c) => c.isOverdue).length} overdue</li>
            ))}
          </ul>
        )}
      </Dialog>

      <Dialog
        open={!!report}
        onClose={() => setReport(null)}
        title={report ? `${report.propertyName} — Course Completion Report` : "Report"}
        description={report ? `Training status for all ${report.members.length} team members at this property.` : ""}
        wide
        footer={<Button variant="outline" onClick={() => setReport(null)}>Close</Button>}
      >
        {report && (
          <div style={{ maxHeight: 360, overflow: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Role</th>
                  <th>Course</th>
                  <th>Category</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {report.members.flatMap((m) =>
                  m.courses.map((c, i) => (
                    <tr key={`${m.id}-${c.courseId}`} className={c.status === "completed" ? "completed" : ""}>
                      <td style={{ fontWeight: 500 }}>{i === 0 ? m.name : ""}</td>
                      <td className="muted">{i === 0 ? m.role : ""}</td>
                      <td>{c.title}</td>
                      <td className="muted">{c.category === "compliance" ? "Compliance" : "Standard"}</td>
                      <td className={c.isOverdue ? "danger-text" : "muted"}>{fmtDate(c.dueDate)}</td>
                      <td>
                        {c.isOverdue ? <span className="danger-text">Overdue</span> : c.status === "completed" ? "Completed" : c.status === "in_progress" ? "In Progress" : "Not started"}
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        )}
      </Dialog>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
