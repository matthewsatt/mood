from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Regexp, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(5, 30), username_exists])
    email = StringField('email', validators=[
        DataRequired(), Length(max=255),
        Regexp(r'^[^@\s]+@[^@\s]+$', message='Must be a valid email.'),
        user_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=5)])
