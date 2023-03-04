"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeInterceptor = exports.Serialize = void 0;
const operators_1 = require("rxjs/operators");
function Serialize(dto) {
}
exports.Serialize = Serialize;
class SerializeInterceptor {
    intercept(context, handler) {
        return handler.handle().pipe((0, operators_1.map)((data) => {
            console.log({ context });
            return data;
        }));
    }
}
exports.SerializeInterceptor = SerializeInterceptor;
//# sourceMappingURL=serialize.interceptor.js.map