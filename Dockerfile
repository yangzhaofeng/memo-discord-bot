FROM debian:stable

ADD . /memo-bot/

RUN cd /memo-bot && \
	apt update && \
	apt -y upgrade && \
	apt install -y nodejs libsqlite3-0 && \
	apt install -y npm libsqlite3-dev && \
	npm install --production && \
	apt remove -y --purge npm libsqlite3-dev && \
	apt autoremove -y --purge && \
	apt clean && \
	rm -rf /var/lib/apt/lists/* && \
	mkdir -p /memo-bot/db

WORKDIR /memo-bot

CMD ["node", "/memo-bot/index.js"]
