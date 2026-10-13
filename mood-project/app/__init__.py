import os
from flask import Flask, request, redirect, abort
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.moodlist_routes import moodlist_routes
from .api.song_routes import song_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)


# Answer with a 401 instead of redirecting: a redirected PUT or DELETE gets
# replayed against the redirect target and fails with a confusing 405.
@login.unauthorized_handler
def unauthorized():
    return {'errors': ['Unauthorized']}, 401


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(moodlist_routes, url_prefix='/api/moodlists')
app.register_blueprint(song_routes, url_prefix="/api/songs")
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/api/health')
def health():
    return {'status': 'ok'}


@app.errorhandler(404)
def not_found(e):
    # The React app handles its own routes, so only /api/* paths are real 404s
    if request.path.startswith('/api/'):
        return {'errors': ['Not found']}, 404
    return e


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path.startswith('api/'):
        abort(404)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
