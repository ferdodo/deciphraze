FROM node
WORKDIR /deciphraze/pwa
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

