export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

export function isOverdue(dueDate: Date): boolean {
  return new Date() > new Date(dueDate);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return '#FF9500';
    case 'completed':
      return '#34C759';
    case 'verified':
      return '#007AFF';
    case 'approved':
      return '#30D158';
    default:
      return '#8E8E93';
  }
}

export function getStatusText(status: string): string {
  switch (status) {
    case 'pending':
      return 'To Do';
    case 'completed':
      return 'Completed';
    case 'verified':
      return 'Verified';
    case 'approved':
      return 'Approved';
    default:
      return 'Unknown';
  }
}
