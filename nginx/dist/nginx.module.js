"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NginxModule = void 0;
const nginx_controller_1 = require("./nginx.controller");
const common_1 = require("@nestjs/common");
let NginxModule = class NginxModule {
};
NginxModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [nginx_controller_1.NginxController],
    })
], NginxModule);
exports.NginxModule = NginxModule;
//# sourceMappingURL=nginx.module.js.map