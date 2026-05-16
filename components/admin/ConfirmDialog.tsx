'use client';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  serial?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  serial = 'DIQQƏT',
  confirmLabel = 'Sil',
  cancelLabel = 'Ləğv et',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;
  return (
    <div className="adm-modal-backdrop" onClick={onCancel}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
        <span className="num">{serial}</span>
        <h3 dangerouslySetInnerHTML={{ __html: title }} />
        <p>{message}</p>
        <div className="actions">
          <button type="button" className="adm-btn adm-btn-ghost" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="adm-btn adm-btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
