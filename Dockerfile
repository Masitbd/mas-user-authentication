FROM node:21-alpine
ENV PORT=4001
COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm","run","dev"]