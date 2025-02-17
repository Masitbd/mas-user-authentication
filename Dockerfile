FROM node:20-alpine
WORKDIR /app
COPY package.json tsconfig.json ./
COPY . .
RUN npm install && \
    npm install cookie-parser && \
    npm run build && \
    npm cache clean --force && \
    rm -rf /root/.npm && \
    rm -rf node_modules

EXPOSE 3003
CMD ["npm","start"]