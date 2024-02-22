from flask import Blueprint, jsonify, request, json
from flask_login import login_required, current_user
from app.models import Album, User, db
from app.forms import AlbumForm
from datetime import datetime as dt

album_routes = Blueprint('albums', __name__)

@album_routes.route("/<int:id>")
def album_by_id(id):
    album = Album.query.get(id)
    
    return {
        "album":album.toDict()
    }

@album_routes.route("/")
def all_albums():
    albums = Album.query.all()
    return {
        "albums":[album.toDictLimited() for album in albums]
    }

@album_routes.route("/new", methods=["POST"])
@login_required
def create_album():
    song_pass_valid = []
    song_fail_valid = []

    form_data = json.loads(request.data)
    user = User.query.get(current_user.id)

    #post songs
    for song in form_data["songs"]:
        #validate song
        #if song validation fails, add that to a validations error list
        #post each song
        #add each song to list
        pass
    
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