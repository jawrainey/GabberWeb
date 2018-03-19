FROM node:9-alpine as builder

WORKDIR /app
COPY [ "package.json", "package-lock.json", "/app/" ]
RUN npm install -s > /dev/null
COPY [ ".", "/app/" ]
RUN npm run build > /dev/null

FROM nginx:1-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/startup.sh /
CMD [ "sh", "startup.sh" ]
