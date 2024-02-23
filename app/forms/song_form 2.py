from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired

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

