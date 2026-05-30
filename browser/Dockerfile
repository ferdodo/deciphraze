FROM node
WORKDIR /deciphraze/browser
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

