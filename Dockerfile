FROM node AS base
WORKDIR /deciphraze
COPY package.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .

FROM base AS dev
CMD ["npm", "run", "dev"]

FROM base AS verify
CMD ["npm", "run", "verify"]
