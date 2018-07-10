FROM node:latest as build

### install dependencies

# Please, check & delete unused files
COPY package.json .
COPY app app
COPY config config
COPY data data
COPY spec spec
COPY index.kubernetes.js .
#COPY public/js/markerClustererPlus.js public/js/

# build
RUN npm install modclean -g
RUN npm install
RUN modclean -r

# Please, check & delete unused files
FROM node:alpine
RUN mkdir /var/www
WORKDIR "/var/www"
COPY --from=build app app
COPY --from=build config config
COPY --from=build data data
COPY --from=build spec spec
COPY --from=build index.kubernetes.js index.kubernetes.js
COPY --from=build node_modules node_modules
COPY --from=build package.json package.json

EXPOSE 4000
CMD node ./index.kubernetes.js