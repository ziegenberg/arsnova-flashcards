arsnova🍅cards - Docker Instructions
---

## Prerequisites
You must have Docker and Docker Compose installed. In most cases, Docker Compose is already included in Docker. Get it from [»here«](https://docs.docker.com/install). When using docker, make sure, you are **not** connected to any VPN.

**We strongly recommend that you use Linux.** If you still want to use Windows, follow these instructions: [🍅cards on Docker for Windows](./docker_win_readme.md).

## Getting started (fast)
You can start using arsnova.cards or linux.cards locally by just downloading and running a docker file. The app will then be available on [localhost](http://localhost).

Download your docker file:
- [arsnova.cards](.docker/docker-compose-cards.yml)
- [linux.cards](.docker/docker-compose-linux.yml)

Then run it with
```bash
sudo docker-compose -f <path-to-downloaded-file> up -d
```

No need to clone a repository or to build anything.

As a Linux User, you can also download and run the app in one step without downloading a file:
```bash
# for arsnova.cards
wget -qO- https://raw.githubusercontent.com/thm-projects/arsnova-flashcards/master/.docker/docker-compose-cards.yml  | sudo docker-compose -f - up -d

# for linux.cards
wget -qO- https://raw.githubusercontent.com/thm-projects/arsnova-flashcards/master/.docker/docker-compose-linux.yml  | sudo docker-compose -f - up -d
```

---

**The default port for the app is Port 8000. If your Port 8000 is already in use, you may configure the forwarded Port in the downloaded docker-compose.yml file.**

---

**To stop the app, run**
```bash
sudo docker-compose -f <path-to-docker-compose-file> stop
```
to resume:
```bash
sudo docker-compose -f <path-to-docker-compose-file> start
```

---

**To stop the app and remove the containers, run**
```bash
sudo docker-compose -f <path-to-docker-compose-file> down
```
to restart:
```bash
sudo docker-compose -f <path-to-docker-compose-file> up -d
```

---

**For the Linux Users who run the app in one single step:**
```bash
# stop
wget -qO- <choosen-url>  | sudo docker-compose -f - stop
# resume with
wget -qO- <choosen-url>  | sudo docker-compose -f - start

# stop and remove the containers
wget -qO- <choosen-url>  | sudo docker-compose -f - down
# restart with
wget -qO- <choosen-url>  | sudo docker-compose -f - up -d
```

## Image overview
There are two stages and two variations for which you could build and run the app. All in all you will find four Dockerfiles in this repository. We will go into what is for what now.

**You can build/run the app in two stages: _production_ and _develop_.**

The production stage will be precomiled and you will not be able to see any changes you make in the code, unless you rebuild the image. This stage is made for **using** the app and not for developing.

The develop stage will be compiled on the fly (in runtime) and you will see changes immediately. This stage is made for **developing** the app. **Beware:** the Database might not be persistent in this stage. It may be dropped when you rebuild or update the image.

**You can build/run the app in two variants: _arsnova.cards_ and _linux.cards_.**

To switch the variant, you may specify the settings file used to build the Image. You may pass it to the container when creating it.

**What are those Dockerfiles for?**
```
./Dockerfile
  # this is the one you will need to build the app locally for development

./.docker/app/Dockerfile
  # this is the one you will need to build the app locally for production

./.docker/kaniko/Dockerfile
  # this one is needed for the automated build in the CI - dont change it unless you know what you are doing

./.docker/proxy/Dockerfile
  # this one is used to build the proxy for the app - it is usually not neccessary to change it
```

## Self Build resources
If you are about to build the resources yourself or if you would like to develop on cards, you have to know git. Please make sure, you have at least passed the git webinar before proceeding.

## Building production images yourself
1. Clone the project
2. From your project root directory run `sudo docker build -f .docker/app/Dockerfile -t <your-custom-tag> .`

## Build the proxy yourself
1. Clone the project
2. From your project root directory run `sudo docker build -t <your-custom-tag> .docker/proxy`

## Bringing up the application and self-build images automatically
1. Clone the project
2. From your project directory run `sudo docker-compose -f .docker/docker-compose.yml up -d --build`\
  2.1. If your local port 8000 is already in use, you can change it in `.docker/docker-compose.yml`
3. The app is now available under [localhost](http://localhost)

## Developing with Docker
You can build and run the development version of cards with docker. Therefore you can use the standard Dockerfile in the projects root directory.
1. Clone the project
2. From your project directory run `docker-compose up`
3. This will brings up the app under Port 8000 - you may change this port in the docker-compose.yml file\
  3.1. The first time you run this, it may take a (long) while\
  3.2. If you like to start the containers detached, use command option `-d`\
  3.3. You may run the app with a custom `settings.json`-File by adding it in the docker-compose file as `command`\
  3.4. You may stop the cluster rather than remove it, so the app doesn't need to be built next time
4. The app is now available under **localhost:\<desired-port\>**
