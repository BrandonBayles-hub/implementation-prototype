import { useEffect } from "react";

export function Button({ variant = "default", size, className = "", children, ...props }) {
  const cls = ["btn", variant === "outline" && "btn-outline", variant === "ghost" && "btn-ghost", size === "sm" && "btn-sm", className]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}

export function Badge({ tone, className = "", children }) {
  const map = { danger: "badge-danger", warning: "badge-warning", success: "badge-success", elite: "badge-elite", count: "badge-count", outline: "badge-outline" };
  return <span className={`badge ${map[tone] || ""} ${className}`.trim()}>{children}</span>;
}

export function EliteBadge() {
  return <Badge tone="elite">Elite</Badge>;
}

export function ToggleGroup({ value, onChange, options, "aria-label": ariaLabel }) {
  return (
    <div className="toggles" role="group" aria-label={ariaLabel}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`toggle ${value === opt.value ? "active" : ""}`}
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
          {opt.count != null && <Badge tone="count">{opt.count}</Badge>}
        </button>
      ))}
    </div>
  );
}

export function AlertBanner({ tone = "info", title, description, action }) {
  return (
    <div className={`banner banner-${tone}`} role="status">
      <div>
        <div className="banner-title">{title}</div>
        {description ? <p className="banner-desc">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Dialog({ open, onClose, title, description, children, footer, wide }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="overlay" onClick={onClose} role="presentation">
      <div
        className={`dialog ${wide ? "dialog-wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title" className="dialog-title">{title}</h2>
        {description ? <p className="dialog-desc">{description}</p> : null}
        <div className="dialog-body">{children}</div>
        {footer ? <div className="dialog-foot">{footer}</div> : null}
      </div>
    </div>
  );
}

export function Field({ label, hint, children, extra }) {
  return (
    <div>
      <div className="row" style={{ marginBottom: 6 }}>
        <label className="label" style={{ margin: 0 }}>{label}</label>
        {extra}
      </div>
      {children}
      {hint ? <p className="hint" style={{ marginTop: 6 }}>{hint}</p> : null}
    </div>
  );
}

export function Toast({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className="toast" role="status" aria-live="polite">
      <span>{message}</span>
      <button type="button" className="btn btn-ghost btn-sm" onClick={onDismiss} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
