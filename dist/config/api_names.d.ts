declare const ApiNames: {
    readonly UP: "UP";
    readonly DOWN: "DOWN";
};
type ApiNames = typeof ApiNames[keyof typeof ApiNames];
