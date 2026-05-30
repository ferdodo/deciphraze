FROM node
WORKDIR /deciphraze/core
COPY package.json .
RUN npm install

WORKDIR /deciphraze
COPY --from=deciphraze-git /deciphraze/.git .git

WORKDIR /deciphraze/core
COPY . .
