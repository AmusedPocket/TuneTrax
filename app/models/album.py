from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Album(db.Model):
    __tablename__ = 'albums'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    album_pic = db.Column(db.String(255), default="No Image")
    body = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    release_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def toDict(self):
        return {
            "id":self.id,
            "title":self.title,
            "album_pic":self.album_pic,
            "body":self.body,
            "user":self.user.toDictLimited(),
            "songs":[song.toDictLimited() for song in self.songs],
            "likes":[user.toDictLimited() for user in self.likes],
            "release_date":self.release_date,
            "created_at":self.created_at,
            "updated_at":self.updated_at,
        }
    
    def toDictLimited(self):
        return {
            "id":self.id,
            "title":self.title,
            "album_pic":self.album_pic,
            "release_date":self.release_date,
        }

    # RELATIONSHIPS: 
    # Many to Many
    songs = db.relationship(
        "Song",
        secondary="album_songs",
        back_populates="albums"
    )
    likes = db.relationship(
        "User",
        secondary="album_likes",
        back_populates="user_liked_albums"
    )

    # One to Many
    user = db.relationship(
        "User",
        back_populates="albums"
    )
