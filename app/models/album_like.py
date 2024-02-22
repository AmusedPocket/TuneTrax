from .db import db, environment, SCHEMA, add_prefix_for_prod


album_likes = db.Table(
    "album_likes",
    db.Column(
        "album_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("albums.id")), 
        primary_key=True
    ),
    db.Column(
        "user_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("users.id")), 
        primary_key=True
    )
)

if environment == "production":
    album_songs.schema = SCHEMA