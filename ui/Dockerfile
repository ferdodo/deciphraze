FROM node
WORKDIR /deciphraze/ui
COPY package.json .
RUN npm install

WORKDIR /deciphraze
COPY --from=deciphraze-design-system /deciphraze/design-system design-system

WORKDIR /deciphraze/ui
COPY . .
RUN npm run build