function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export const CATEGORIES = [
  "Accounting",
  "Analytics & Insights",
  "Compliance",
  "Entrata Product",
  "Fair Housing",
  "Lead-to-Lease",
  "Maintenance",
  "Resident Management",
  "Training & Support",
];

export const TEAM_MEMBERS = [
  {
    id: "tm-heron-maria",
    name: "Maria Chen",
    role: "Leasing Agent",
    propertyId: "prop-heron",
    propertyName: "The Heron — Brooklyn Heights",
    courses: [
      { courseId: "fair-housing-ny", title: "Fair Housing — New York", category: "compliance", status: "completed", dueDate: daysFromNow(-60), isOverdue: false },
      { courseId: "lead-to-lease", title: "Lead-to-Lease Fundamentals", category: "standard", status: "completed", dueDate: daysFromNow(-30), isOverdue: false },
      { courseId: "harassment-ny", title: "Harassment Prevention — NY", category: "compliance", status: "in_progress", dueDate: daysFromNow(12), isOverdue: false },
    ],
  },
  {
    id: "tm-heron-luis",
    name: "Luis Ortega",
    role: "Maintenance Tech",
    propertyId: "prop-heron",
    propertyName: "The Heron — Brooklyn Heights",
    courses: [
      { courseId: "fair-housing-ny", title: "Fair Housing — New York", category: "compliance", status: "not_started", dueDate: daysFromNow(-8), isOverdue: true },
      { courseId: "work-orders", title: "Creating a Work Order", category: "standard", status: "completed", dueDate: daysFromNow(-45), isOverdue: false },
      { courseId: "make-ready", title: "Make Ready Basics", category: "standard", status: "in_progress", dueDate: daysFromNow(5), isOverdue: false },
    ],
  },
  {
    id: "tm-heron-sam",
    name: "Sam Whitaker",
    role: "Assistant Manager",
    propertyId: "prop-heron",
    propertyName: "The Heron — Brooklyn Heights",
    courses: [
      { courseId: "fair-housing-ny", title: "Fair Housing — New York", category: "compliance", status: "completed", dueDate: daysFromNow(-45), isOverdue: false },
      { courseId: "harassment-ny", title: "Harassment Prevention — NY", category: "compliance", status: "not_started", dueDate: daysFromNow(-3), isOverdue: true },
      { courseId: "screening", title: "Processing a Screening", category: "standard", status: "completed", dueDate: daysFromNow(-20), isOverdue: false },
    ],
  },
  {
    id: "tm-heron-diana",
    name: "Diana Flores",
    role: "Resident Services",
    propertyId: "prop-heron",
    propertyName: "The Heron — Brooklyn Heights",
    courses: [
      { courseId: "fair-housing-ny", title: "Fair Housing — New York", category: "compliance", status: "completed", dueDate: daysFromNow(-30), isOverdue: false },
      { courseId: "harassment-ny", title: "Harassment Prevention — NY", category: "compliance", status: "completed", dueDate: daysFromNow(-14), isOverdue: false },
      { courseId: "resident-mgmt", title: "Resident Profile Ledgers", category: "standard", status: "not_started", dueDate: daysFromNow(10), isOverdue: false },
    ],
  },
  {
    id: "tm-river-alex",
    name: "Alex Torres",
    role: "Leasing Agent",
    propertyId: "prop-riverhouse",
    propertyName: "Riverhouse Greenpoint",
    courses: [
      { courseId: "fair-housing-ny", title: "Fair Housing — New York", category: "compliance", status: "completed", dueDate: daysFromNow(-10), isOverdue: false },
      { courseId: "harassment-ny", title: "Harassment Prevention — NY", category: "compliance", status: "completed", dueDate: daysFromNow(-10), isOverdue: false },
      { courseId: "lead-to-lease", title: "Lead-to-Lease Fundamentals", category: "standard", status: "completed", dueDate: daysFromNow(-20), isOverdue: false },
    ],
  },
  {
    id: "tm-river-priya",
    name: "Priya Nair",
    role: "Leasing Agent",
    propertyId: "prop-riverhouse",
    propertyName: "Riverhouse Greenpoint",
    courses: [
      { courseId: "fair-housing-ny", title: "Fair Housing — New York", category: "compliance", status: "completed", dueDate: daysFromNow(-5), isOverdue: false },
      { courseId: "harassment-ny", title: "Harassment Prevention — NY", category: "compliance", status: "completed", dueDate: daysFromNow(-5), isOverdue: false },
      { courseId: "guest-cards", title: "Guest Cards", category: "standard", status: "in_progress", dueDate: daysFromNow(14), isOverdue: false },
    ],
  },
  {
    id: "tm-river-james",
    name: "James Kim",
    role: "Maintenance Tech",
    propertyId: "prop-riverhouse",
    propertyName: "Riverhouse Greenpoint",
    courses: [
      { courseId: "fair-housing-ny", title: "Fair Housing — New York", category: "compliance", status: "completed", dueDate: daysFromNow(-22), isOverdue: false },
      { courseId: "work-orders", title: "Creating a Work Order", category: "standard", status: "completed", dueDate: daysFromNow(-30), isOverdue: false },
    ],
  },
  {
    id: "tm-sunset-nina",
    name: "Nina Wallace",
    role: "Leasing Agent",
    propertyId: "prop-sunset-park",
    propertyName: "Sunset Park LIHTC",
    courses: [
      { courseId: "fair-housing-ny", title: "Fair Housing — New York", category: "compliance", status: "not_started", dueDate: daysFromNow(-14), isOverdue: true },
      { courseId: "affordable-housing", title: "Affordable Housing Compliance", category: "compliance", status: "not_started", dueDate: daysFromNow(-7), isOverdue: true },
      { courseId: "harassment-ny", title: "Harassment Prevention — NY", category: "compliance", status: "not_started", dueDate: daysFromNow(21), isOverdue: false },
    ],
  },
  {
    id: "tm-sunset-eric",
    name: "Eric Medina",
    role: "Maintenance Tech",
    propertyId: "prop-sunset-park",
    propertyName: "Sunset Park LIHTC",
    courses: [
      { courseId: "fair-housing-ny", title: "Fair Housing — New York", category: "compliance", status: "not_started", dueDate: daysFromNow(-5), isOverdue: true },
      { courseId: "work-orders", title: "Creating a Work Order", category: "standard", status: "in_progress", dueDate: daysFromNow(10), isOverdue: false },
    ],
  },
  {
    id: "tm-sunset-grace",
    name: "Grace Okonkwo",
    role: "Assistant Manager",
    propertyId: "prop-sunset-park",
    propertyName: "Sunset Park LIHTC",
    courses: [
      { courseId: "fair-housing-ny", title: "Fair Housing — New York", category: "compliance", status: "completed", dueDate: daysFromNow(-30), isOverdue: false },
      { courseId: "affordable-housing", title: "Affordable Housing Compliance", category: "compliance", status: "in_progress", dueDate: daysFromNow(3), isOverdue: false },
      { courseId: "household-certs", title: "Household Certifications", category: "compliance", status: "not_started", dueDate: daysFromNow(6), isOverdue: false },
    ],
  },
];

const SEVEN = 7 * 86400000;

export function courseIsDueSoon(course, now = Date.now()) {
  if (course.isOverdue || !course.dueDate) return false;
  const dueMs = new Date(`${course.dueDate}T00:00:00`).getTime();
  return dueMs > now && dueMs - now <= SEVEN;
}
export function memberHasOverdue(m) {
  return m.courses.some((c) => c.isOverdue);
}
export function memberHasNotStartedOnly(m) {
  return !memberHasOverdue(m) && m.courses.some((c) => c.status === "not_started");
}
export function memberHasDueSoonOnly(m) {
  return !memberHasOverdue(m) && !memberHasNotStartedOnly(m) && m.courses.some((c) => courseIsDueSoon(c));
}
export function memberExceptionKind(m) {
  if (memberHasOverdue(m)) return "overdue";
  if (memberHasNotStartedOnly(m)) return "not-started";
  if (memberHasDueSoonOnly(m)) return "due-soon";
  return "complete";
}
export function overdueCourseCount(m) {
  return m.courses.filter((c) => c.isOverdue).length;
}
export function notStartedOpenCount(m) {
  return m.courses.filter((c) => c.status === "not_started" && !c.isOverdue).length;
}
export function dueSoonCourseCount(m, now = Date.now()) {
  return m.courses.filter((c) => courseIsDueSoon(c, now)).length;
}
export function assignedCourseSummary(m, visible = 2) {
  if (!m.courses.length) return "No courses assigned";
  const ranked = [...m.courses].sort((a, b) => {
    const rank = (c) => (c.isOverdue ? 0 : c.status === "not_started" ? 1 : c.status === "in_progress" ? 2 : 3);
    return rank(a) - rank(b);
  });
  const shown = ranked.slice(0, visible).map((c) => c.title);
  const extra = ranked.length - shown.length;
  return extra > 0 ? `${shown.join(", ")} +${extra} more` : shown.join(", ");
}

/** uploadKind → player format. A PDF is format "pdf", never hardcoded "scorm". */
export function formatFromUploadKind(kind) {
  if (kind === "pdf") return "pdf";
  if (kind === "video") return "video";
  if (kind === "job-aid") return "job-aid";
  if (kind === "link") return "link";
  return "scorm";
}

export const SEED_CONTENT = [
  { id: "cc-scorm-1", title: "Adjusting a Move-In Date", type: "Course", structure: "SCORM", catalog: "Lead-to-Lease", status: "Published", version: "v1", uploadKind: "scorm", format: "scorm", scormName: "move-in-date-v2.zip" },
  { id: "cc-pdf-1", title: "Guest Card Field Guide", type: "Course", structure: "PDF", catalog: "Lead-to-Lease", status: "Draft", version: "v1", uploadKind: "pdf", format: "pdf", fileName: "guest-card-field-guide.pdf" },
  { id: "cc-video-1", title: "Make Ready Walkthrough", type: "Course", structure: "Video", catalog: "Maintenance", status: "Published", version: "v1", uploadKind: "video", format: "video", videoName: "make-ready-walkthrough.mp4" },
];

export const ACADEMY_DUE_COURSES = [
  { id: "comp-fair-housing-act", title: "The Fair Housing Act" },
  { id: "comp-aml", title: "Anti-Money Laundering" },
  { id: "comp-workplace-harassment", title: "Preventing Workplace Harassment · Global" },
];
export const ACADEMY_TEAM_OVERDUE = [
  { personId: "e-ryan", personName: "Jordan Rivera", courseId: "comp-workplace-harassment", courseTitle: "Sexual Harassment Prevention" },
];
export const ACADEMY_DUE_DATE = "2026-10-05";
export function formatAcademyDueDate(iso = ACADEMY_DUE_DATE) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function initialsFor(name) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}
