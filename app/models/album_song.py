from .db import db, environment, SCHEMA, add_prefix_for_prod


album_songs = db.Table(
    "album_songs",
    db.Column(
        "album_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("albums.id")), 
        primary_key=True
    ),
    db.Column(
        "song_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("songs.id")), 
        primary_key=True
    )
)

if environment == "production":
    album_songs.schema = SCHEMA