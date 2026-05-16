type Status = 'completed' | 'in_progress' | 'planned';

const LABELS: Record<Status, string> = {
  completed: 'Tamamlanıb',
  in_progress: 'Davam edir',
  planned: 'Planlaşdırılıb',
};

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`adm-badge ${status}`}>{LABELS[status]}</span>;
}
