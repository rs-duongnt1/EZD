"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NginxController = void 0;
const child_process_1 = require("child_process");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const Handlebars = require("handlebars");
const path_1 = require("path");
let NginxController = class NginxController {
    constructor() { }
    async execCommand() {
        const data = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "../", "templates/nginx-server.conf.template"), "utf-8");
        var template = Handlebars.compile(data);
        const nginxServerConfig = template({
            server_name: "aaaa.example.test",
            root: "/var/www/xxx/yyy/zzz",
        });
        (0, fs_1.writeFileSync)(`/etc/nginx/sites-enabled/aaa.example.test.conf`, nginxServerConfig);
        (0, child_process_1.exec)("service nginx reload", (err, stdout, stderr) => {
            if (err)
                throw err;
            console.log(stdout.toString());
        });
        return true;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)("nginx_new_config"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NginxController.prototype, "execCommand", null);
NginxController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [])
], NginxController);
exports.NginxController = NginxController;
//# sourceMappingURL=nginx.controller.js.map