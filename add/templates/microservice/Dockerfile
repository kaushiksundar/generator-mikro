FROM node:8.11.1-alpine

LABEL maintainer="kaushik11091@gmail.com"

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

RUN npm i -g nodemon

ENV NODE_ENV=development

ENV PORT=3000

EXPOSE 3000

CMD [ "nodemon", "-L", "src/index.js"]
