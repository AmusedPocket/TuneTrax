from .db import db, environment, SCHEMA, add_prefix_for_prod


following = db.Table(
    "following",
    db.Column(
        "user_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("users.id")), 
        primary_key=True
    ),
    db.Column(
        "follower_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("users.id")), 
        primary_key=True
    )
)

if environment == "production":
    following.schema = SCHEMA