from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum

class Genre(Enum):
    electronic = "electronic" # Trevor
    rock = "rock" # Trevor
    pop = "pop" # Trevor
    alternative = "alternative" # Garrett
    hauntology = "hauntology" # Garrett 
    classical = "classical" # Garrett
    indie = "indie" # Kai
    rap = "rap" # Kai
    country = "country" # Chris
    metal = "metal" # Chris

class Song(db.Model):
    __tablename__ = 'songs'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    song_link = db.Column(db.String(255), nullable=False)
    song_pic = db.Column(db.String(255), default="No Image")
    body = db.Column(db.Text)
    genre = db.Column(db.Enum(Genre), nullable=False)
    visibility = db.Column(db.Boolean, nullable=False, default=False)
    plays = db.Column(db.Integer, nullable=False, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # RELATIONSHIPS: 
    # Many to Many
    albums = db.relationship(
        "Album",
        secondary="album_songs",
        back_populates="songs"
    )
    playlists = db.relationship(
        "Playlist",
        secondary="playlist_songs",
        back_populates="songs"
    )

    # One to Many
    comments = db.relationship(
        "Comment",
        back_populates="song"
    )
    user = db.relationship(
        "User",
        back_populates="songs"
    )
    likes = db.relationship(
        "Like",
        back_populates="songs"
    )