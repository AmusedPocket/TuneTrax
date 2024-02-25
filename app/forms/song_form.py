from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, FileField
from wtforms.validators import DataRequired
from ..s3_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileRequired, FileAllowed

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
    title = StringField("Title", validators=[DataRequired()])
    body = StringField("Body", validators=[DataRequired()])
    genre = StringField("Genre", validators=[DataRequired()])
    visibility = BooleanField("Visibility")
    song_file = FileField('Song', validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS)])
    song_pic = FileField('Song Pic', validators=[FileAllowed(ALLOWED_EXTENSIONS)])

