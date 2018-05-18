FROM node:latest as build

### install dependencies

# Please, check & delete unused files
COPY package.json .
COPY app app
COPY app_console app_console
COPY app_worker app_worker
COPY bin bin
COPY config config
COPY data data
COPY spec spec
COPY index.js .
COPY console.js .
COPY worker.js .
#COPY public/js/markerClustererPlus.js public/js/

# build
RUN npm install modclean -g
RUN npm install
RUN modclean -r

# Please, check & delete unused files
FROM node:alpine
COPY --from=build app app
COPY --from=build app_console app_console
COPY --from=build app_worker app_worker
COPY --from=build bin bin
COPY --from=build config config
COPY --from=build data data
COPY --from=build spec spec
COPY --from=build index.js index.js
COPY --from=build console.js console.js
COPY --from=build worker.js worker.js
COPY --from=build node_modules node_modules
COPY --from=build package.json package.json

EXPOSE 4000
CMD node index.js