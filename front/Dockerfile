FROM node
WORKDIR /deciphraze/front
COPY package.json .
RUN npm install

WORKDIR /deciphraze
COPY --from=deciphraze-git /deciphraze/.git .git
COPY --from=deciphraze-ui /deciphraze/ui ./ui
COPY --from=deciphraze-browser /deciphraze/browser ./browser
COPY --from=deciphraze-core /deciphraze/core ./core
COPY --from=deciphraze-persistance /deciphraze/persistance ./persistance

WORKDIR /deciphraze/front
COPY . .
CMD ["npm", "run", "dev"]