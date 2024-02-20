from flask import Blueprint, request
from app.models import Song, db
from flask_login import login_required, current_user
from datetime import datetime

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

    # return song.song_dict()
    return print("hi")

#Upload a song
@song_routes.route('', methods=["POST"])
@login_required
def post_song():
    #song_link = aws
    #song_pic = aws

    song_data = request.form.to_dict()

    new_song = Song(
        title = song_data["title"],
        body = song_data["body"],
        genre = song_data["genre"],
        visibility = song_data["visibility"],
        plays = song_data["plays"],
        user_id = current_user.id,
        created_at = datetime.utcnow()
    )










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
