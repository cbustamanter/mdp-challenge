FROM node:latest 

ARG environment

ENV environment ${environment:-docker}

WORKDIR /usr/local/app

COPY package.json package-lock.json index.js docker.env /usr/local/app/

COPY src /usr/local/app/src/

COPY docker /usr/local/app/docker/

RUN npm install

RUN ["chmod", "+x", "/usr/local/app/docker/entrypoint.sh"]

ENTRYPOINT [ "/usr/local/app/docker/entrypoint.sh" ]