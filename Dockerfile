FROM node:14.5-alpine AS dev
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
ADD webpack.config.js babel.config.js .browserslistrc ./
ADD src/ ./src/
ADD assets/ ./assets/
RUN yarn build:webpack
COPY server/ ./server
RUN yarn run build:server

FROM node:14.5-alpine AS runtime
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY --from=dev /app/dist/ ./dist
COPY --from=dev /app/lib/ ./lib
EXPOSE 3000
# Execute via sh to ensure SIGTERM is received by node
CMD ["/bin/sh", "-c", "node lib/index.js"]
