from flask import Blueprint, request
from app.models import Song, db, Comment, User
from flask_login import login_required, current_user
from datetime import datetime
import app.s3_helpers as s3
from app.forms import SongForm, CommentForm

song_routes = Blueprint('songs', __name__)

# Helper function for posting a song with a validated songForm 
def post_song(songForm):
    song = songForm.data["song_file"]

    song.filename = s3.get_unique_filename(song.filename)
    upload_song = s3.upload_file_to_s3(song)
    
    upload_pic = {"url": "No Image"}

    song_pic = songForm.data['song_pic']
    if song_pic:
        song_pic.filename = s3.get_unique_filename(song_pic.filename)
        upload_pic = s3.upload_file_to_s3(song_pic)   
    
    user = User.query.get(current_user.id)
    new_song = Song(
        user = user,
        title = songForm.data["title"],
        body = songForm.data["body"],
        genre = songForm.data["genre"],
        visibility = songForm.data["visibility"],
        plays = 0,
        user_id = current_user.id,
        song_link = upload_song['url'],
        song_pic = upload_pic['url']
    )

    db.session.add(new_song)
    db.session.commit()
    return new_song

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
@song_routes.route('/', methods=["POST"])
@login_required
def post_song_route():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']    
    if form.validate_on_submit():
        new_song = post_song(form)
        return new_song.song_dict()
    
    return {"errors": form.errors}, 401

#Edit a song by song id
#Need AWS framework implemented
@song_routes.route('/<int:id>', methods=["POST"])
@login_required
def update_song(id):
    song = Song.query.get(id)

    if not song:
        return {"errors": "Song not found"}, 404
    
    updated_song = SongForm()
    updated_song['csrf_token'].data = request.cookies['csrf_token']
    print("updated song is: ", updated_song)
    
    if updated_song.validate_on_submit():
        song.title = updated_song.title.data
        song.song_link = updated_song.song_link.data
        if request.files['song']:
            new_song = request.files['song']
            new_song.filename = s3.get_unique_filename(new_song.filename)
            upload_song = s3.upload_file_to_s3(new_song)
            song.song_link = upload_song['url'],
        song.body = updated_song.body.data
        song.genre = updated_song.genre.data

    song_data = request.form.to_dict()
    song.title = song_data["title"]
    song.song_link = song_data["song_link"]
    
    song.song_pic = song_data["song_pic"]
    song.body = song_data["body"]
    song.genre = song_data["genre"]
    # song.visibility = song_data["visibility"]

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
    """
    Delete a song comment by accessing the song, and deleting the comment from it.
    """
    comment = Comment.query.get(c_id)
    if not comment:
        return {"Error": "Cannot find comment"}
    db.session.delete(comment)
    db.session.commit()
    return {"message": "Deleted successful"}

# Edit a comment
@song_routes.route('/<int:_id>/comments/<int:c_id>', methods=["POST"])
@login_required
def edit_song_comment(_id, c_id):
    """
    Edit a song comment by accessing it via comments id and adding form to it.
    """

    comment = Comment.query.get(c_id)
    form = CommentForm()
    
    if form.validate_on_submit() and comment.user_id == current_user.id:
        comment.comment = form.data['comment']
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
    """
    Add a like to the song by appending the user to the likes.
    """
    song = Song.query.get(id)
    song.likes.append(current_user)
    db.session.add(song)
    db.session.commit()
    return song.song_dict()


# Delete a Like
@song_routes.route('/<int:id>/like', methods=['DELETE'])
@login_required
def delete_like(id):
    """
    Delete a like by removing the user from the likes
    """
    song = Song.query.get(id)
    song.likes.remove(current_user)
    db.session.add(song)
    db.session.commit()
    return {"message": "Removed the Like"}
