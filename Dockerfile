FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install --production=false || true
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node","dist/index.js"]
