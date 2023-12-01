FROM node
RUN useradd -ms /bin/bash larac
ADD . /app/
WORKDIR /app
RUN rm -rf node_modules
RUN npm install 
RUN chown -R larac:larac /app
EXPOSE 3874
CMD ["npm", "run", "start"]


