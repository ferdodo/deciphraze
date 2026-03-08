#!/bin/sh
set -e
docker compose run -T --rm --build --remove-orphans core npm run verify
docker compose run -T --rm --build --remove-orphans design-system npm run verify
docker compose run -T --rm --build --remove-orphans ui npm run verify
docker compose run -T --rm --build --remove-orphans front npm run verify
docker compose run -T --rm --build --remove-orphans browser npm run verify
