from .db import db, environment, SCHEMA, add_prefix_for_prod


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
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # RELATIONSHIPS: 
    # Many to Many
    songs = db.relationship(
        "Song",
        secondary="album_songs",
        back_populates="albums"
    )

    # One to Many
    likes = db.relationship(
        "Like",
        back_populates="albums"
    )
    user = db.relationship(
        "User",
        back_populates="albums"
    )
