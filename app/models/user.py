from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .following import follows
from datetime import datetime


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
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # RELATIONSHIPS: 
    # Many to Many
    followers = db.relationship(
        "User",
        secondary="follows",
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.user_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )
    user_liked_songs = db.relationship(
        "Song",
        secondary="song_likes",
        back_populates="likes"
    )
    user_liked_albums = db.relationship(
        "Album",
        secondary="album_likes",
        back_populates="likes"
    )
    user_liked_playlists = db.relationship(
        "Playlist",
        secondary="playlist_likes",
        back_populates="likes"
    )
    user_liked_comments = db.relationship(
        "Comment",
        secondary="comment_likes",
        back_populates="likes"
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
