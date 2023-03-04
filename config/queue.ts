export const QUEUES = {
  SEND_EMAIL: 'SEND_EMAIL',
} as const;
type QUEUES = typeof QUEUES[keyof typeof QUEUES];
