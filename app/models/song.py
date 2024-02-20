from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum
from datetime import datetime

class Genre(Enum):
    Electronic = "Electronic" # Trevor
    Rock = "Rock" # Trevor
    Pop = "Pop" # Trevor
    Alternative = "Alternative" # Garrett
    Hauntology = "Hauntology" # Garrett 
    Classical = "Classical" # Garrett
    Indie = "Indie" # Kai
    Rap = "Rap" # Kai
    Country = "Country" # Chris
    Metal = "Metal" # Chris

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
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def toDictLimited(self):
        return {
            "id":self.id,
            "title":self.title,
            "genre":self.genre.name,
            "song_link":self.song_link,
            "song_pic":self.song_pic,
            "username":self.user.username,
            "likes":len(self.likes)
        }

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
    likes = db.relationship(
        "User",
        secondary="song_likes",
        back_populates="user_liked_songs"
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