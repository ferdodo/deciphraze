FROM node
WORKDIR /deciphraze/front
COPY package.json .
RUN npm install

WORKDIR /deciphraze
COPY --from=deciphraze-git /deciphraze/.git .git

WORKDIR /deciphraze/front
COPY . .
CMD ["npm", "run", "dev"]