from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length


class AddMoodForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=40)])
    color = StringField('color', validators=[Length(max=40)])
    submit = SubmitField('submit')
