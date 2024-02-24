from flask import Blueprint, jsonify, request, json
from flask_login import login_required, current_user
from app.models import Album, Song, User, db
from app.forms import AlbumForm, SongForm
from datetime import datetime as dt
from app.api.song_routes import post_song
import app.s3_helpers as s3

album_routes = Blueprint('albums', __name__)

@album_routes.route("/<int:id>")
def album_by_id(id):
    album = Album.query.get(id)
    
    return {
        "album":album.toDict()
    }

@album_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_album_by_id(id):
    user = User.query.get(current_user.id)
    album = Album.query.get(id)
    
    if user.id != album.user.id:
        return { "message": "Forbidden."}, 403

    db.session.delete(album)
    db.session.commit()
    
    return {
        "message": "Successfully deleted."
    }


@album_routes.route("/<int:id>", methods=["POST"])
@login_required
def update_album(id):
    user = User.query.get(current_user.id)
    album = Album.query.get(id)

    if user.id != album.user.id:
        return { "message": "Forbidden."}, 403

    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album.title = form.data["title"] or album.title
        album.album_pic = form.data["album_pic"] or album.album_pic
        album.body = form.data["body"] or album.body
        album.user = user
        album.release_date = dt.strptime(form.data["release_date"] or album.release_date, "%Y-%m-%d")
        album.songs = album.songs
        
        db.session.add(album)
        db.session.commit()
        return { "album": album.toDict() }, 200
    return { "errors": form.errors }, 401    

@album_routes.route("/")
def all_albums():
    albums = Album.query.all()
    return {
        "albums":[album.toDictLimited() for album in albums]
    }

@album_routes.route("/", methods=["POST"])
@login_required
def create_album():
    song_pass_valid = []
    song_fail_valid = []

    form_data = json.loads(request.data)
    user = User.query.get(current_user.id)

    #post songs
    for song in form_data["songs"]:
        #validate song
        print(song)
        if not s3.song_file(song.filename):
            song_fail_valid.append(song.title)

        song_form = SongForm(
            title=song.title or None,
            body=song.body or None,
            genre=song.genre or None,
            visibility=song.visibility or False,
            song_file=song.song_file,
            song_pic=song.song_pic if song.song_pic else None
        )

        if song_form.validate_on_submit():
            #post each song    
            new_song = post_song(song_form)
            #add each song to list
            song_pass_valid.append(new_song)
        else:
            #if song validation fails, add that to a validations error list
            song_fail_valid.append(song)
    
    # should any songs fail validation, send the list back and dont create an album
    if len(song_fail_valid):
        return json.dumps(song_fail_valid), 400

    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        payload = Album(
            title=form.data["title"],
            album_pic=form.data["album_pic"],
            body=form.data["body"],
            user=user,
            release_date=dt.strptime(form.data["release_date"], "%Y-%m-%d"),
            songs=song_pass_valid
        )
        
        db.session.add(payload)
        db.session.commit()
        return { "album": payload.toDict() }, 200
    return { "errors": form.errors }, 401    
