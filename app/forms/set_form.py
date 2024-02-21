from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class AlbumForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    album_pic = StringField("album_pic")
    body = StringField("body")
    release_date = StringField('release_date', validators=[DataRequired()])

class PlaylistForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    playlist_pic = StringField("playlist_pic")
    body = StringField("body")
    