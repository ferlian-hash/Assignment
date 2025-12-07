# 1. Base image
FROM node:20-alpine

# 2. Set workdir
WORKDIR /app

# 3. Copy package files first (caching benefit)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy all source code
COPY . .

# 6. Generate Prisma Client
RUN npx prisma generate

# 7. Build Next.js for production
RUN npm run build

# 8. Port aplikasi
EXPOSE 3000

# 9. Jalankan migrasi + start server (production)
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
