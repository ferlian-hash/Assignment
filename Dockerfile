# --- Base image ---
FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy seluruh project (termasuk .env & prisma)
COPY . .

# Generate Prisma
RUN npx prisma generate

# Build Next.js production
RUN npm run build

EXPOSE 3000
EXPOSE 5555

# Run database migration then start server
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
