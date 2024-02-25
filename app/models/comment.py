from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)

    song_time = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    # RELATIONSHIPS:
    # Many to Many
    likes = db.relationship(
        "User",
        secondary="comment_likes",
        back_populates="user_liked_comments"
    )

    # One to Many
    song = db.relationship(
        "Song",
        back_populates="comments"
    )
    user = db.relationship(
        "User",
        back_populates="comments"
    )

    def comment_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "user": self.user.to_dict(),
            "song_id": self.song_id,
            "song_time": self.song_time,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
