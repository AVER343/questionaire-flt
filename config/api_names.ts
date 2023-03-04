const ApiNames = {
  UP: 'UP',
  DOWN: 'DOWN',
} as const;
type ApiNames = typeof ApiNames[keyof typeof ApiNames];
