FROM node
WORKDIR /deciphraze/ui
COPY package.json .
RUN npm install


WORKDIR /deciphraze/ui
COPY . .
RUN npm run build