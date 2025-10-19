#!/bin/bash
STATE=`mktemp -d`
touch $STATE/src
touch $STATE/build

function sync-containers {
	docker cp . "deciphraze-frontend-1:/deciphraze"
}

function at-least-3GB-free-space {
	[ $(df --output=avail / | tail -n1) -gt 3000000 ] || (echo "Not enough free space" && exit 1)
}

function set-state {
	find . -type f -not -path '*/\.*' -printf "%T+\t%M\t%p\n" | md5sum > $STATE/$1
}

function diff-state {
	cmp -s $STATE/$1 $STATE/$2 || return 0
	return 1
}

function setup_pre_commit_hook {
	if [ -f ".git/hooks/pre-commit" ]; then
        return 0
    fi

	ls .git/hooks/pre-commit.sample
	echo "#!/bin/sh" > .git/hooks/pre-commit
	echo "docker compose up -d --build" >> .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit
}


function rebuild {
	set -e
	echo ""
	echo "╭────────────────────────────╮"
	echo "│ Rebuilding containers..    │ "
	echo "│ press ctrl-c again to stop │ "
	echo "╰────────────────────────────╯"
	set +e
    trap - SIGINT
	set -e
	at-least-3GB-free-space
	docker compose up -d --build
	
	docker cp deciphraze-frontend-1:/deciphraze/stryker-incremental.json .
	
	print_startup
    trap rebuild SIGINT
	set +e
}

function print_startup {
	echo ""
	echo "╭───────────────────────────────────────────────────╮"
	echo "│ Frontend: http://localhost:1111                   │"
	echo "│                                                   │"
	echo "│ Live feedback:                                    │"
	echo "│   docker compose logs -f --no-log-prefix frontend │"
	echo "╰───────────────────────────────────────────────────╯"
}

set -e
setup_pre_commit_hook
at-least-3GB-free-space
trap rebuild SIGINT
docker compose up -d --build

docker cp deciphraze-frontend-1:/deciphraze/stryker-incremental.json .

print_startup
set +e

while true
do 
	set-state src

	if diff-state src build; then
		set-state build && sync-containers
	fi

	sleep 1
done