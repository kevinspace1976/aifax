"use client";

import type { ReactNode } from "react";

type DeleteFormProps = {
  action: string;
  confirmText: string;
  fields?: Record<string, string>;
  className?: string;
  children: ReactNode;
};

/**
 * Plain form POST guarded by a browser confirm, for admin delete buttons.
 * Hidden fields carry what to delete; the route redirects back afterwards.
 */
export function DeleteForm({ action, confirmText, fields = {}, className, children }: DeleteFormProps) {
  return (
    <form
      action={action}
      method="post"
      className={className}
      onSubmit={(event) => {
        if (!window.confirm(confirmText)) event.preventDefault();
      }}
    >
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {children}
    </form>
  );
}

/** Ticks or clears every checkbox named `name` inside the same form. */
export function SelectAll({ name, label }: { name: string; label: string }) {
  return (
    <input
      type="checkbox"
      aria-label={label}
      onChange={(event) => {
        const form = event.currentTarget.form;
        if (!form) return;
        const checked = event.currentTarget.checked;
        form.querySelectorAll<HTMLInputElement>(`input[type=checkbox][name="${name}"]`).forEach((box) => {
          box.checked = checked;
        });
      }}
    />
  );
}
