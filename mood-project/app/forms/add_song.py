from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, Optional, URL



class AddSongForm(FlaskForm):
    name = StringField("name", validators=[DataRequired("Please provide a name for the song."), Length(max=40)])
    artist = StringField("artist", validators=[DataRequired("Please provide a name for the artist"), Length(max=40)])
    rating = IntegerField("rating", validators=[DataRequired("Please provide a rating for the song"), NumberRange(1, 10)])
    song_url = StringField("song_url", validators=[Optional(), URL(message="Song link must be a valid URL.")])
    song_image = StringField("song_image", validators=[Optional(), URL(message="Image link must be a valid URL.")])
    moodlistId = IntegerField("moodlistId", validators=[DataRequired()])
    submit = SubmitField("submit")
