FROM node
WORKDIR /deciphraze/ui
COPY package.json .
RUN npm install
COPY . .
RUN npm run build