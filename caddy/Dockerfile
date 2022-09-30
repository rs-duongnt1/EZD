FROM caddy:latest as development

COPY caddyfile.json /etc/caddy/

EXPOSE 80
EXPOSE 443
EXPOSE 2019

CMD caddy run --config /etc/caddy/caddyfile.json --resume