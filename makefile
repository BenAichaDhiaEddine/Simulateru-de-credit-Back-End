.PHONY: build up down apps ps db log-app log-db log-adminmongo first-install db-seed volume seed

.DEFAULT_GOAL = help

help:
	echo " make build : to start to rebuild the Baladity-api."
	echo " make up : to start all the Services for the Baladity-api."
	echo "make down to sotp all the Services for Baladity-api.  "

build:
	make down
	docker-compose build
up:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
	docker-compose ps
down:
	docker-compose down
	docker-compose ps
apps:
	docker exec -it  baladity-app /bin/sh
ps:
	docker-compose ps
db:
	docker exec -it baladity-adminmongo /bin/sh
log-app:
	docker logs baladity-app
log-db:
	docker logs baladity-db

log-adminmongo:
	docker logs baladity-adminmongo

volume:
	make down
	sudo rm -r mongodb
	mkdir mongodb
	make up
	make seed

seed:
	docker exec -it baladity-app  node  seeders/codePostal.seeder.ts seeders/address.seeder.ts
