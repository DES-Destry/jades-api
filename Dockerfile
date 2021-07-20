# Get node that installed in the my computer  
FROM node:14.17.0

# Copy project to the image
RUN mkdir /srv/app
COPY . /srv/app
WORKDIR /srv/app

# Install dependecies
RUN npm install --save-prod

# Build and run the nest project
RUN npm run build
CMD ["npm", "run", "start:prod"]
