import { useEffect, useState } from "react";
import { Eye, Lock, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { CATEGORIES, SEED_CONTENT, formatFromUploadKind } from "./data.js";
import { AlertBanner, Badge, Button, Dialog, EliteBadge, Field, Toast, ToggleGroup } from "./kit.jsx";

const KIND_LABEL = {
  scorm: "SCORM",
  pdf: "PDF",
  video: "Video",
  "job-aid": "Job aid",
  link: "Link",
};

const KIND_HINT = {
  scorm: "Chapters, PDFs, video, and quizzes live in the package. Upload one SCORM .zip.",
  pdf: "Upload a PDF. Native type — not wrapped in SCORM. Filename only; this prototype does not store the file.",
  video: "Upload a video. Native type — not wrapped in SCORM. Filename only; this prototype does not transcode.",
  "job-aid": "Upload a job aid (PDF or document). Native type — not wrapped in SCORM.",
  link: "Paste a SOP or SharePoint URL. Learners open the link; it is not wrapped in SCORM.",
};

function emptyForm() {
  return {
    title: "",
    description: "",
    minutes: 30,
    catalog: "Lead-to-Lease",
    uploadKind: "scorm",
    scormName: null,
    videoName: null,
    fileName: null,
    contentUrl: "",
  };
}

function formFromItem(item) {
  return {
    title: item.title,
    description: item.description ?? "",
    minutes: item.durationMinutes ?? 30,
    catalog: item.catalog,
    uploadKind: item.uploadKind ?? "scorm",
    scormName: item.scormName ?? null,
    videoName: item.videoName ?? null,
    fileName: item.fileName ?? null,
    contentUrl: item.contentUrl ?? "",
  };
}

function AddCourseDialog({ open, onClose, onSave, initialItem, elite }) {
  const [form, setForm] = useState(emptyForm());
  const previewLocked = !elite && !initialItem;
  const mappedFormat = formatFromUploadKind(form.uploadKind);

  useEffect(() => {
    if (!open) return;
    setForm(initialItem ? formFromItem(initialItem) : emptyForm());
  }, [open, initialItem]);

  const persist = (status) => {
    if (previewLocked) return;
    onSave({
      id: initialItem?.id ?? `cc-${Date.now()}`,
      title: form.title.trim() || "Untitled course",
      type: "Course",
      structure: KIND_LABEL[form.uploadKind],
      format: mappedFormat,
      catalog: form.catalog,
      status,
      version: initialItem?.version ?? "v1",
      description: form.description.trim(),
      durationMinutes: form.minutes,
      uploadKind: form.uploadKind,
      scormName: form.uploadKind === "scorm" ? form.scormName : null,
      videoName: form.uploadKind === "video" ? form.videoName : null,
      fileName: form.uploadKind === "pdf" || form.uploadKind === "job-aid" ? form.fileName : null,
      contentUrl: form.uploadKind === "link" ? form.contentUrl.trim() || null : null,
    });
    onClose();
  };

  const fileLabel =
    form.uploadKind === "scorm"
      ? form.scormName ?? "Choose SCORM package (.zip)"
      : form.uploadKind === "pdf"
        ? form.fileName ?? "Choose PDF (.pdf)"
        : form.uploadKind === "job-aid"
          ? form.fileName ?? "Choose job aid (.pdf, .docx, .pptx)"
          : form.videoName ?? "Choose video (.mp4, .webm, .mov)";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={previewLocked ? "Add course · Preview" : initialItem ? "Edit course" : "Add course"}
      description={
        previewLocked
          ? "Preview only. Saving needs Elite."
          : "Save as Draft keeps this course in My Content only. Publish adds it to Learning Catalog."
      }
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="outline" disabled={previewLocked} onClick={() => persist("Published")}>Publish</Button>
          <Button disabled={previewLocked} onClick={() => persist("Draft")}>
            {previewLocked ? <><Lock size={14} /> Unlock Elite to Save</> : initialItem?.status === "Published" ? "Save" : "Save as Draft"}
          </Button>
        </>
      }
    >
      {previewLocked && (
        <AlertBanner tone="info" title="Fill the form to preview. Elite unlocks save." />
      )}
      <div className="stack" style={{ marginTop: previewLocked ? 12 : 0 }}>
        <Field label="Title">
          <input className="input" value={form.title} placeholder="e.g. Adjusting a Move-In Date" onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
        </Field>
        <Field label="Description">
          <textarea className="textarea" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
        </Field>
        <div className="row">
          <Field label="Estimated completion">
            <div className="row">
              <input className="input" type="number" min={1} style={{ width: 96 }} value={form.minutes} onChange={(e) => setForm((f) => ({ ...f, minutes: Math.max(1, Number(e.target.value) || 1) }))} />
              <span className="xs muted">min</span>
            </div>
          </Field>
          <Field label="Catalog">
            <select className="select" value={form.catalog} onChange={(e) => setForm((f) => ({ ...f, catalog: e.target.value }))}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
        <div>
          <p className="label">Content type</p>
          <ToggleGroup
            aria-label="Content type"
            value={form.uploadKind}
            onChange={(next) =>
              setForm((f) => ({
                ...f,
                uploadKind: next,
                scormName: next === "scorm" ? f.scormName : null,
                videoName: next === "video" ? f.videoName : null,
                fileName: next === "pdf" || next === "job-aid" ? f.fileName : null,
                contentUrl: next === "link" ? f.contentUrl : "",
              }))
            }
            options={[
              { value: "scorm", label: "SCORM" },
              { value: "pdf", label: "PDF" },
              { value: "video", label: "Video" },
              { value: "job-aid", label: "Job aid" },
              { value: "link", label: "Link" },
            ]}
          />
          <p className="hint" style={{ marginTop: 8 }}>{KIND_HINT[form.uploadKind]}</p>
          <p className="xs" style={{ marginTop: 8 }}>
            Player format: <code>{mappedFormat}</code>
            {form.uploadKind !== "scorm" ? " — not wrapped as SCORM." : ""}
          </p>
          {form.uploadKind === "link" ? (
            <input
              className="input"
              type="url"
              placeholder="https://sharepoint.example.com/sop"
              value={form.contentUrl}
              onChange={(e) => setForm((f) => ({ ...f, contentUrl: e.target.value }))}
              aria-label="Content URL"
            />
          ) : (
            <label className="dash" style={{ marginTop: 8 }}>
              <Upload size={16} className="muted" />
              <span className="grow muted">{fileLabel}</span>
              <input
                key={form.uploadKind}
                type="file"
                className="sr-only"
                accept={
                  form.uploadKind === "scorm"
                    ? ".zip,application/zip"
                    : form.uploadKind === "pdf"
                      ? ".pdf,application/pdf"
                      : form.uploadKind === "job-aid"
                        ? ".pdf,.doc,.docx,.ppt,.pptx,application/pdf"
                        : "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
                }
                onChange={(e) => {
                  const name = e.target.files?.[0]?.name ?? null;
                  setForm((f) => ({
                    ...f,
                    scormName: f.uploadKind === "scorm" ? name : f.scormName,
                    videoName: f.uploadKind === "video" ? name : f.videoName,
                    fileName: f.uploadKind === "pdf" || f.uploadKind === "job-aid" ? name : f.fileName,
                  }));
                }}
              />
            </label>
          )}
        </div>
        <p className="hint">Drafts stay in My Content. Published courses appear in Learning Catalog.</p>
      </div>
    </Dialog>
  );
}

export function AddCourse({ elite }) {
  const [items, setItems] = useState(SEED_CONTENT);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [catalogFilter, setCatalogFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [publishNotice, setPublishNotice] = useState(null);
  const [toast, setToast] = useState(null);

  const visible = items.filter(
    (i) =>
      (search.trim() === "" || i.title.toLowerCase().includes(search.trim().toLowerCase())) &&
      (statusFilter === "all" || i.status === statusFilter) &&
      (catalogFilter === "all" || i.catalog === catalogFilter),
  );

  const openAdd = () => {
    setEditing(null);
    setAddOpen(true);
  };

  return (
    <div className="page">
      <div className="row">
        <h1 className="page-title">Academy · Admin</h1>
        {elite ? <EliteBadge /> : <Badge tone="outline">Basic</Badge>}
      </div>
      <p className="page-desc">My Content · custom course types. Demo data. Files stay as filenames only — nothing is uploaded or emailed.</p>

      <div className="stack" style={{ marginTop: 16 }}>
        {!elite && (
          <AlertBanner
            tone="info"
            title="My Content requires Elite"
            description="Preview Add course. Saving needs Elite."
          />
        )}
        {publishNotice && (
          <AlertBanner
            tone="success"
            title="Published"
            description={`${publishNotice} is now in Learning Catalog.`}
            action={<Button variant="ghost" size="sm" onClick={() => setPublishNotice(null)}>Dismiss</Button>}
          />
        )}

        <div className="card">
          <div className="row" style={{ padding: 16, borderBottom: "1px solid hsl(var(--border))" }}>
            <Upload size={16} className="muted" />
            <h2 style={{ fontSize: "0.875rem", fontWeight: 600 }}>My Content</h2>
            <Badge tone="count">{visible.length}</Badge>
            <Button className="ml-auto" variant={elite ? "default" : "outline"} onClick={openAdd} aria-label={elite ? "Add course" : "Preview Add course — save requires Academy Elite"}>
              {elite ? <Plus size={16} /> : <Lock size={16} />}
              {elite ? "Add course" : "Preview Add course"}
            </Button>
          </div>
          <div className="row" style={{ padding: 16, borderBottom: "1px solid hsl(var(--border))" }}>
            <input className="input grow" placeholder="Search courses" value={search} onChange={(e) => setSearch(e.target.value)} />
            <select className="select" style={{ width: 160 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
            <select className="select" style={{ width: 180 }} value={catalogFilter} onChange={(e) => setCatalogFilter(e.target.value)}>
              <option value="all">All catalogs</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 16 }}>Title</th>
                  <th>Type</th>
                  <th>Structure</th>
                  <th>Format</th>
                  <th>Catalog</th>
                  <th>Status</th>
                  <th>Ver.</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((item) => (
                  <tr key={item.id}>
                    <td style={{ paddingLeft: 16, fontWeight: 500 }}>{item.title}</td>
                    <td className="muted">{item.type}</td>
                    <td className="muted">{item.structure}</td>
                    <td className="muted"><code>{item.format ?? formatFromUploadKind(item.uploadKind)}</code></td>
                    <td className="muted">{item.catalog}</td>
                    <td>
                      <Badge tone={item.status === "Published" ? "success" : "outline"}>{item.status}</Badge>
                    </td>
                    <td className="muted">{item.version}</td>
                    <td>
                      <div className="row" style={{ justifyContent: "flex-end" }}>
                        <Button variant="outline" size="sm" onClick={() => setPreview(item)} aria-label={`Preview ${item.title}`}>
                          <Eye size={14} /> Preview
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => { setEditing(item); setAddOpen(true); }} aria-label={`Edit ${item.title}`}>
                          <Pencil size={14} /> Edit
                        </Button>
                        {item.status === "Draft" && elite && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, status: "Published" } : x)));
                              setPublishNotice(item.title);
                            }}
                          >
                            Publish
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="btn-danger" onClick={() => setPendingDelete(item)} aria-label={`Delete ${item.title}`}>
                          <Trash2 size={14} /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddCourseDialog
        open={addOpen}
        elite={elite}
        initialItem={editing}
        onClose={() => { setAddOpen(false); setEditing(null); }}
        onSave={(item) => {
          if (!elite) return;
          setItems((prev) => {
            const exists = prev.some((x) => x.id === item.id);
            return exists ? prev.map((x) => (x.id === item.id ? item : x)) : [item, ...prev];
          });
          if (item.status === "Published") setPublishNotice(item.title);
          else setToast(`${item.title} saved as draft in this prototype.`);
        }}
      />

      <Dialog
        open={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.title ?? "Preview"}
        description="Prototype preview — no SCORM player or file playback."
        footer={<Button variant="outline" onClick={() => setPreview(null)}>Close</Button>}
      >
        {preview && (
          <div className="stack xs">
            <p><strong>Structure:</strong> {preview.structure}</p>
            <p><strong>Format:</strong> <code>{preview.format ?? formatFromUploadKind(preview.uploadKind)}</code></p>
            <p><strong>Catalog:</strong> {preview.catalog}</p>
            <p><strong>Status:</strong> {preview.status}</p>
            {preview.scormName && <p><strong>Package:</strong> {preview.scormName}</p>}
            {preview.fileName && <p><strong>File:</strong> {preview.fileName}</p>}
            {preview.videoName && <p><strong>Video:</strong> {preview.videoName}</p>}
            {preview.contentUrl && <p><strong>URL:</strong> {preview.contentUrl}</p>}
          </div>
        )}
      </Dialog>

      <Dialog
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        title={pendingDelete ? `Delete ${pendingDelete.title}?` : "Delete course?"}
        description="This removes it from My Content and Learning Catalog."
        footer={
          <>
            <Button variant="outline" onClick={() => setPendingDelete(null)}>Cancel</Button>
            <Button
              onClick={() => {
                setItems((prev) => prev.filter((x) => x.id !== pendingDelete.id));
                setPendingDelete(null);
              }}
            >
              Delete
            </Button>
          </>
        }
      />

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
