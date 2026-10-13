from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length



class EditMoodForm(FlaskForm):
    name = StringField('name', validators=[DataRequired("Please provide a name the Playlist."), Length(max=40)])
    color = StringField('color', validators=[Length(max=40)])
    submit = SubmitField('submit')
