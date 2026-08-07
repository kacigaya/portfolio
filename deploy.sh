#!/usr/bin/env bash
# Deploy the live site. Invoked by the portfolio-deploy SSH key as a forced
# command (see ~/.ssh/authorized_keys), or by hand.
set -euo pipefail

cd /home/ubuntu/projects/portfolio

git fetch --prune origin
# reset, not pull: this checkout is never edited by hand, and a merge conflict
# here would stall every future deploy.
git reset --hard origin/main

/home/ubuntu/.bun/bin/bun install --frozen-lockfile

# The build fetches pinned repos from the GitHub GraphQL API and throws without
# a token (lib/projects.ts). Same file the service reads at runtime.
set -a
. /etc/portfolio.env
set +a

/home/ubuntu/.bun/bin/bun run build

# `next start` loads the build output at boot, so a build alone changes nothing.
sudo /usr/bin/systemctl restart portfolio
