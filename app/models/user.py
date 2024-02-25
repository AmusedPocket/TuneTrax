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

    def toDictAlbum(self):
        return {
            "id":self.id,
            "username":self.username,
            "profile_pic":self.profile_pic,
            "follows":self.followers.count()
        }

    def toDictLimited(self):
        return {
            "id":self.id,
            "username":self.username,
            "profile_pic":self.profile_pic,
            "follows":self.followers.count(),
            "songs":[song.toDictLimited() for song in self.songs],
            "playlists":[playlist.toDictLimited() for playlist in self.playlists],
            "albums":[album.toDictLimited() for album in self.albums]
        }
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'user_liked_songs': [song.id for song in self.user_liked_songs]
        }

    def public_user_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "username": self.username,
            "profile_pic": self.profile_pic,
            "header_pic": self.header_pic,
            "description": self.description,
            "created_at": self.created_at
        }
    # RELATIONSHIPS: 
    # Many to Many
    followers = db.relationship(
        "User",
        secondary="follows",
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.user_id == id),
        backref=db.backref("follows", lazy="dynamic"),
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

    
