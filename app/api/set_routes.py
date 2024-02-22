from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Album
from app.forms import AlbumForm, PlaylistForm

set_routes = Blueprint('sets', __name__)

@set_routes.route("/new", methods=["POST"])
@login_required
def post_set():
    print(current_user.get_id())
    print(request.form.args)
    song_pass_valid = []
    song_fail_valid = []

    #post songs
    # for song in request.form["songs"]:
    #     #validate song
    #     #if song validation fails, add that to a validations error list
    #     #post each song
    #     #add each song to list
    #     pass
    


    # form = AlbumForm() if "Album" == request.form["type"] else PlaylistForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     payload = Album(
    #         title=form.data["title"],
    #         album_pic=form.data["album_pic"],
    #         body=form.data["body"],
    #         user=None,
    #         release_date=form.data["release_date"],
    #     )
    # return form.errors, 401    
    return "Broke as hell", 200