from flask import Blueprint, request
from app.models import Song, db, Comment
from flask_login import login_required, current_user
from datetime import datetime
import app.s3_helpers as s3

song_routes = Blueprint('songs', __name__)



#Get all song routes
@song_routes.route('/')
def songs():
    songs = Song.query.all()
    print("in songs route")
    return {song.id:song.song_dict() for song in songs}


#Get a single song
@song_routes.route('/<int:id>')
def single_song(id):
    song = Song.query.get(id)

    return song.song_dict()


#Upload a song
@song_routes.route('', methods=["POST"])
@login_required
def post_song():
    #song_link = aws
    #song_pic = aws
    if "song" not in request.files:
        return {"errors": "song required"}, 400



    song = request.files['song']

    if not s3.song_file(song.filename):
        return {"errors": "file type not supported"}, 400

    song.filename = s3.get_unique_filename(song.filename)

    upload = s3.upload_file_to_s3(song)

    song_url = upload['url']

    song_data = request.form.to_dict()

    new_song = Song(
        title = song_data["title"],
        body = song_data["body"],
        genre = song_data["genre"],
        visibility = song_data["visibility"],
        plays = song_data["plays"],
        user_id = current_user.id,
        created_at = datetime.utcnow(),
        song_link = song_url
    )

    db.session.add(new_song)
    db.session.commit()
    return new_song()

#Edit a song by song id
#Need AWS framework implemented
@song_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_song(id):
    song = Song.query.get(id)

    if not song:
        return {"Error": "Song not found"}, 404

    song_data = request.form.to_dict()

    song.title = song_data["title"]
    song.song_link = song_data["song_link"]
    song.song_pic = song_data["song_pic"]
    song.body = song_data["body"]
    song.genre = song_data["genre"]
    song.visibility = song_data["visibility"]
    song.plays = song_data["plays"]
    song.user_id = song_data["user_id"]
    song.updated_at = song_data["updated_at"]
    song.albums = song_data["albums"]
    song.playlists = song_data["playlists"]
    song.likes = song_data["likes"]
    song.comments = song_data["comments"]
    song.user = song_data["user"]

    db.session.add(song)
    db.session.commit()

    return song.song_dict()

#Delete a song by id
#Need to remove file from aws s3
@song_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_song(id):
    song = Song.query.get(id)

    if not song:
        return {"Error": "Song not found"}, 404

    db.session.delete(song)
    db.session.commit()

    return {"Message": "Successfully Deleted"}

# Post a new comment on the song
@song_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def post_song_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            comment = form.data["comment"],
            user_id = current_user.id,
            song_id = id,
            song_time = form.data["song_time"],
            created_at = datetime.utcnow(),
            updated_at = datetime.utcnow()
        )
        db.session.add(comment)
        db.session.commit()
        return comment.comment_dict()
    return {"Error": "Unable to create comment"}

# Delete a comment from the song
@song_routes.route('/<int:_id>/comments/<int:c_id>', methods=["DELETE"])
@login_required
def delete_song_comment(_id, c_id):
    comment = Comment.query.get(c_id)
    if not comment:
        return {"Error": "Cannot find comment"}
    db.session.delete(comment)
    db.session.commit()
    return {"message": "Deleted successful"}

# Edit a comment
@song_routes.route('/<int:_id>/comments/<int:c_id>', methods=["PUT"])
@login_required
def edit_song_comment(_id, c_id):
    comment = Comment.query.get(c_id)
    form = CommentForm()
    if comment.user_id == current_user.id:
        comment.comment = form.data['comment']
        comment.song_time = form.data['song_time']
        comment.updated_at = datetime.utcnow()
        db.session.add(comment)
        db.session.commit()
        return comment.comment_dict()
    else:
        return {"Error": "Could not edit comment"}


# Add a Like
@song_routes.route('/<int:id>/like', methods=['POST'])
@login_required
def add_like(id):
    song = Song.query.get(id)
    song.likes.append(current_user)
    db.session.add(song)
    db.session.commit()
    return song.song_dict()


# Delete a Like
@song_routes.route('/<int:id>/like', methods=['DELETE'])
@login_required
def delete_like(id):
    song = Song.query.get(id)
    song.likes.delete(current_user)
    db.session.add(song)
    db.session.commit()
    return {"message": "Remove the Like"}
