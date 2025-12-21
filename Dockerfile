FROM node
WORKDIR /deciphraze
COPY package.json .
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
CMD ["npm", "run", "dev"]