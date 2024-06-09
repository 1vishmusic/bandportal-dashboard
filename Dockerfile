FROM node:alpine3.18

RUN npm install -g serve

ARG GENERATED_FILES=dist
COPY ${GENERATED_FILES} ./

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "./"]