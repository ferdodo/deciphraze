FROM node AS deps
WORKDIR /deciphraze
COPY package.json .
RUN npm install

FROM deciphraze-frontend-deps
RUN npm audit --audit-level=critical
COPY . .
CMD ["npm", "run", "dev"]