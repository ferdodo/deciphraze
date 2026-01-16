FROM node
WORKDIR /deciphraze/design-system
COPY package.json .
RUN npm config set maxsockets 1
RUN npm install
RUN npm audit --audit-level=low
COPY . .
RUN npm run build
