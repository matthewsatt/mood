from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    # Only public fields: emails are private to their owner
    users = User.query.all()
    return {'users': [{'id': u.id, 'username': u.username} for u in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    if id != current_user.id:
        return {'errors': ['Forbidden']}, 403
    return current_user.to_dict()
