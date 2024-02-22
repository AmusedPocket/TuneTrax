from .db import db, environment, SCHEMA, add_prefix_for_prod


playlist_likes = db.Table(
    "playlist_likes",
    db.Column(
        "playlist_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("playlists.id")), 
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
    playlist_likes.schema = SCHEMA