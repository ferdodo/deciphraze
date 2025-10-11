FROM node
WORKDIR /deciphraze
COPY package.json .
RUN npm config set maxsockets 1
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build
CMD npm run dev