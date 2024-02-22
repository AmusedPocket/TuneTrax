from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = StringField("comment")
    song_time = StringField("song_time")
    