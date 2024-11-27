

## Build the server project
For build the docker container, run the next command shell in the terminal at the project's root:
```
docker compose build
```

## Running up the server
For run up the server, enter the follow command to the terminal in the project's root:
```
docker compose up filmore_backend
```

The server will be published at [localhost:3000](http://localhost:3000)

## For build a container according the stage
For development:
```
docker build --target development -t myapp:dev
```
For production:
```
docker build --target production -t myapp:prod
```
