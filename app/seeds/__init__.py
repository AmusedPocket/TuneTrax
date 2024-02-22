from flask.cli import AppGroup
from .users import seed_users, undo_users
from .albums import album_seed_data, undo_album_seeds
from .songs import song_seed_data, undo_song_seeds
from .comments import comment_seeds, undo_comment_seeds
from .playlists import playlist_seed_data, undo_playlists

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    all_users = seed_users()
    all_songs = song_seed_data(all_users)
    album_seed_data(all_songs, all_users)
    playlist_seed_data(all_users, all_songs)
    comment_seeds(all_users, all_songs)
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comment_seeds()
    undo_playlists()
    undo_album_seeds()
    undo_song_seeds()
    undo_users()
    # Add other undo functions here
