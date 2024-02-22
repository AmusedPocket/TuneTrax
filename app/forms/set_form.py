from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from datetime import datetime as dt, timedelta

def is_before_today(_form, field):
    if not field:
        return
    if (dt.strptime(field.data, "%Y-%m-%d") - dt.now()).total_seconds() > 0:
        raise ValidationError("Date must be before today.")

class AlbumForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    album_pic = StringField("album_pic")
    body = StringField("body")
    release_date = StringField('release_date', validators=[DataRequired(), is_before_today])

class PlaylistForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    playlist_pic = StringField("playlist_pic")
    body = StringField("body")
    release_date = StringField('release_date', validators=[is_before_today])
    