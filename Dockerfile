# Usa un'immagine base di Node.js
FROM node:18-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia il package.json e installa le dipendenze
COPY package.json package-lock.json ./
RUN npm install

# Copia tutto il codice sorgente
COPY . .

# Costruisci l'app Next.js
RUN npm run build

# Esponi la porta 3000
EXPOSE 3000

# Comando per avviare l'app
CMD ["npm", "start"]
