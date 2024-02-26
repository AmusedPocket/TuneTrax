from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, FileField
from wtforms.validators import DataRequired
from ..s3_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed

genres = [
    "Electronic",
    "Rock",
    "Pop" ,
    "Alternative",
    "Hauntology",
    "Classical",
    "Indie",
    "Rap",
    "Country",
    "Metal"
]

class SongForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(message="Title is required.")])
    body = StringField("Body", validators=[DataRequired(message="Body is required.")])
    genre = StringField("Genre", validators=[DataRequired(message="Genre is required.")])
    visibility = BooleanField("Visibility")
    song_file = FileField('Song', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
    song_pic = FileField('Song Pic', validators=[FileAllowed(ALLOWED_EXTENSIONS)])

