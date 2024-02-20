from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Album

album_routes = Blueprint('albums', __name__)

@album_routes.route("/<int:id>")
def album_by_id(id):
    album = Album.query.get(id)
    print(album.id)
    return {
        "album":album.toDict()
    }

