#!/bin/sh
set -e
node scripts/init-db.mjs
exec npm start
