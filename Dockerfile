FROM node:18

RUN npm run build

CMD ["npm", "run", "start"]