from app.models import playlist, db, environment, SCHEMA
from sqlalchemy.sql import text
from random import sample, randint

def playlist_seed_data(all_users, all_songs):
    playlist1 = playlist(title="Rock Playlist", playlist_pic="", user_id=1, playlist_song=all_songs[0:10])
    playlist2 = playlist(title="Pop Playlist", playlist_pic="", user_id=2, playlist_song=all_songs[10:20])
    playlist3 = playlist(title="Electronic Playlist", playlist_pic="", user_id=3, playlist_song=all_songs[20:30])
    playlist4 = playlist(title="Alternative Playlist", playlist_pic="", user_id=4,  playlist_song=all_songs[30:40])
    playlist5 = playlist(title="Hauntology Playlist", playlist_pic="", user_id=5, playlist_song=all_songs[40:50])
    playlist6 = playlist(title="Classical Playlist", playlist_pic="", user_id=6, playlist_song=all_songs[50:60])
    playlist7 = playlist(title="Rap Playlist", playlist_pic="", user_id=7,  playlist_song=all_songs[60:70])
    playlist8 = playlist(title="Indie Playlist", playlist_pic="", user_id=8,  playlist_song=all_songs[70:80])
    playlist9 = playlist(title="Country Playlist", playlist_pic="", user_id=9,  playlist_song=all_songs[80:90])
    playlist10 = playlist(title="Metal Playlist", playlist_pic="", user_id=10,  playlist_song=all_songs[90:100])

    all_playlists=[playlist1, playlist2, playlist3, playlist4, playlist5, playlist6, playlist7, playlist8, playlist9, playlist10]

    for playlist in all_playlists:
        playlist.user = all_users[playlist.user_id]
        playlist.likes = sample(all_users, randint(0, len(all_users)))

    db.session.add_all(all_playlists)
    db.session.commit()
    return all_playlists

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))
        
    db.session.commit()