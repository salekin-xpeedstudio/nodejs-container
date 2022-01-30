# nodejs-container

## For running locally

`npm i`

### Start the dev server

`npm run dev`

### Build the project

`npm run build`

### Start built project

`npm start`

## For running Docker Containers

_You'll need docker installed on your machine to run this_

### Build the image

`docker-compose build`

### Start the dev server

`docker-compose up -d`

### Stop the server

`docker-compose down`

### Build and start production build

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
