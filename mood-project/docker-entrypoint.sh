#!/bin/sh
# Used by docker-compose.yml for local development.
set -e

flask db upgrade

# Seed only when the database is empty so data added through the app
# survives container restarts. Run `flask seed undo && flask seed all`
# inside the container to reset it.
if ! python - <<'EOF'
import sys
from app import app
from app.models import User

with app.app_context():
    sys.exit(0 if User.query.first() else 1)
EOF
then
  flask seed all
fi

exec gunicorn app:app
