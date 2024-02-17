from .db import db, environment, SCHEMA, add_prefix_for_prod


class Playlist(db.Model):
    __tablename__ = 'playlists'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    playlist_pic = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # RELATIONSHIPS: 
    # Many to Many
    songs = db.relationship(
        "Song",
        secondary="playlist_songs",
        back_populates="playlists"
    )

    # One to Many
    user = db.relationship(
        "User",
        back_populates="playlists"
    )
    likes = db.relationship(
        "Like",
        back_populates="playlists"
    )