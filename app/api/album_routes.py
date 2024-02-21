from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Album
from app.forms import AlbumForm

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
def create_album():
    song_pass_valid = []
    song_fail_valid = []

    #post songs
    # for song in request.form["songs"]:
    #     #validate song
    #     #if song validation fails, add that to a validations error list
    #     #post each song
    #     #add each song to list
    #     pass
    


    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        payload = Album(
            title=form.data["title"],
            album_pic=form.data["album_pic"],
            body=form.data["body"],
            user=None,
            release_date=form.data["release_date"],
        )
    return form.errors, 401    