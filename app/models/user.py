from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255))
    header_pic = db.Column(db.String(255))
    description = db.Column(db.Text)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # RELATIONSHIPS: 
    # Many to Many
    following = db.relationship(
        "User",
        secondary="following",
        back_populates="followers"
    )
    followers = db.relationship(
        "User",
        secondary="following",
        back_populates="following"
    )

    # One to Many
    comments = db.relationship(
        "Comment",
        back_populates="user"
    )
    songs = db.relationship(
        "Song",
        back_populates="user"
    )
    playlists = db.relationship(
        "Playlist",
        back_populates="user"
    )
    albums = db.relationship(
        "Album",
        back_populates="user"
    )
    likes = db.relationship(
        "Like",
        back_populates="users"
    )

    # GETTERS/SETTERS
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
