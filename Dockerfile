FROM ubuntu:20.04
WORKDIR /app

ENV TZ=Europe/Zagreb
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update

# install nodejs
RUN apt-get -y install curl gnupg git build-essential nodejs npm mysql-client imagemagick
RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -

EXPOSE 8080
EXPOSE 8000
EXPOSE 3000
EXPOSE 3001

CMD ["bash"]