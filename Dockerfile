# ------------ STAGE: Build application
FROM node:16.13-buster-slim as build

# Set working directory of application
WORKDIR /srv/build

# Install python for bcrypt successful building
RUN apt-get -y upgrade
RUN apt-get update
RUN apt-get install -y python3 build-essential

# Copy files about dependecies
COPY package.json .
COPY package-lock.json .

# Install dependecies
RUN npm i --save-prod

# Copy project files
COPY . .

# Build and run the nest project
RUN npm run build



# ------------ STAGE: Execute builded application
FROM node:16.13-alpine as execute

# Delete unnecessary global npm packages
RUN npm ls -gp --depth=0 | awk -F/ '/node_modules/ && !/\/npm$/ {print $NF}' | xargs npm -g rm

# Set working directory of application
WORKDIR /srv/app

# Copy all build result without unnecessary items
COPY --from=build /srv/build/node_modules ./node_modules
COPY --from=build /srv/build/dist ./dist

CMD ["node", "dist/main"]
