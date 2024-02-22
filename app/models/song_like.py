from .db import db, environment, SCHEMA, add_prefix_for_prod


song_likes = db.Table(
    "song_likes",
    db.Column(
        "song_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("songs.id")), 
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
    song_likes.schema = SCHEMA