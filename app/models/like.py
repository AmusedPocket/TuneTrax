from .db import db, environment, SCHEMA, add_prefix_for_prod


class Like(db.Model):
    __tablename__ = 'likes'
    __table_args__ = (db.UniqueConstraint(
                    'user_id', 'song_id', 'album_id', 'playlist_id', 'comment_id'
                ),)
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")))
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id")))
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))

    # RELATIONSHIPS: 
    # One to Many
    users = db.relationship(
        "User",
        back_populate="likes"
    )
    songs = db.relationship(
        "Song",
        back_populate="likes"
    )
    albums =db.relationship(
        "Album",
        back_populate="likes"
    )
    playlists = db.relationship(
        "Playlist",
        back_populate="likes"
    )
    comments =  db.relationship(
        "Comment",
        back_populate="likes"
    )