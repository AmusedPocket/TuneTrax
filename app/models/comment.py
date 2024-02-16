from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable=False)
    user_id = db.Integer(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    song_id = db.Integer(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)
    song_time = db.Integer(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # RELATIONSHIPS: 
    # One to Many
    song = db.relationship(
        "Song", 
        back_populates="comments"
    )
    user = db.relationship(
        "User", 
        back_populates="comments"
    )
    likes = db.relationship(
        "Like",
        back_populates="comments"
    )