from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
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

def email_validations(_form, field):
    email = field.data
    if "@" not in email or "." not in email:
        raise ValidationError('Email must be a valid email.')
    
def image_validations(_form, field):
    image = field.data
    if image == "":
        return 
    for ending in [".jpg", ".png", ".jpeg"]:
        if image.endswith(ending):
            return
    raise ValidationError("Image link must end in '.jpg', '.png', or '.jpeg'.")

class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists, email_validations])
    username = StringField('username', validators=[DataRequired(), username_exists])
    password = StringField('password', validators=[DataRequired()])
    profile_pic = StringField('profile_pic', validators=[image_validations])
    header_pic = StringField('header_pic', validators=[image_validations])
    description = StringField('description')
    
