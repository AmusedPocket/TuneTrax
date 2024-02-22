from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    playlist_pic = db.Column(db.String(255))
    body = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    release_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def toDict(self):
        return {
            "id":self.id,
            "title":self.title,
            "playlist_pic":self.playlist_pic,
            "body":self.body,
            "user":self.user.toDictLimited(),
            "songs":[song.toDictLimited() for song in self.songs],
            "likes":[user.toDictLimited() for user in self.likes],
            "release_date":self.release_date.strftime("%Y-%m-%d"),
            "created_at":self.created_at,
            "updated_at":self.updated_at,
        }

    def toDictLimited(self):
        return {
            "id":self.id,
            "title":self.title,
            "playlist_pic":self.playlist_pic,
            "num_likes":len(self.likes),
            "created_at":self.created_at,
            "updated_at":self.updated_at,
        }

    def playlist_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "playlist_pic": self.playlist_pic,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
    
    # RELATIONSHIPS: 
    # Many to Many
    songs = db.relationship(
        "Song",
        secondary="playlist_songs",
        back_populates="playlists"
    )
    likes = db.relationship(
        "User",
        secondary="playlist_likes",
        back_populates="user_liked_playlists"
    )


    # One to Many
    user = db.relationship(
        "User",
        back_populates="playlists"
    )
