"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetApiName = void 0;
const common_1 = require("@nestjs/common");
const SetApiName = (api_name) => (0, common_1.SetMetadata)('API_NAME', api_name);
exports.SetApiName = SetApiName;
//# sourceMappingURL=set-api-name.decorator.js.map