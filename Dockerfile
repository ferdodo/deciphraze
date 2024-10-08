FROM node
WORKDIR /deciphraze
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm config set maxsockets 1
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build

FROM nginx
COPY --from=0 /deciphraze/public /usr/share/nginx/html
