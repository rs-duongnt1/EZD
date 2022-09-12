import { exec } from "child_process";
import { MessagePattern } from "@nestjs/microservices";
import { Controller, Logger } from "@nestjs/common";
import { writeFileSync, readFileSync } from "fs";
import * as Handlebars from "handlebars";
import { join } from "path";
@Controller()
export class NginxController {
  constructor() {}

  @MessagePattern("nginx_new_config")
  async execCommand() {
    const data = readFileSync(
      join(__dirname, "../", "templates/nginx-server.conf.template"),
      "utf-8"
    );
    var template = Handlebars.compile(data);

    const nginxServerConfig = template({
      server_name: "aaaa.example.test",
      root: "/var/www/xxx/yyy/zzz",
    });

    writeFileSync(
      `/etc/nginx/sites-enabled/aaa.example.test.conf`,
      nginxServerConfig
    );

    exec("service nginx reload", (err, stdout, stderr) => {
      if (err) throw err;
      console.log(stdout.toString());
    });

    return true;
  }
}
