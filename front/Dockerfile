FROM node
WORKDIR /deciphraze/front
COPY package.json .
RUN npm install

WORKDIR /deciphraze
COPY --from=deciphraze-git /deciphraze/.git .git
COPY --from=deciphraze-ui /deciphraze/ui ./ui
COPY --from=deciphraze-pwa /deciphraze/pwa ./pwa

WORKDIR /deciphraze/front
COPY . .
CMD ["npm", "run", "dev"]