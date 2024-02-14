# API-Routes

This app uses Dynamic Routes to create a single page experience, and 
handles routes that cannot be easily turned into a single page by redirecting
the user.

## Backend Routes

 * **PUT**  ``/users/:user_id``
 * **PUT**  ``/songs/:song_id``
 * **PUT**  ``/albums/:album_id``
 * **PUT**  ``/playlists/:playlist_id``
 * **PUT**  ``/songs/:song_id/comments/:comment_id``
 * **DELETE**  ``/songs/:song_id/comments/:comment_id``
 * **DELETE**  ``/songs/:song_id/like/:like_id``
 * **DELETE**  ``/albums/:album_id/like/:like_id``
 * **DELETE**  ``/playlists/:playlist_id/like/:like_id``
 * **DELETE**  ``/comments/:comment_id/like/:like_id``
 * **DELETE**  ``/users/:user_id``
 * **DELETE**  ``/songs/:song_id``
 * **DELETE**  ``/albums/:album_id``
 * **DELETE**  ``/playlists/:playlist_id``

## User Facing Routes
 
 * **POST**  ``/users``
 * **POST**  ``/songs``
 * **POST**  ``/albums``
 * **POST**  ``/playlists``

### Dynamic Routes

 * **POST**  ``/songs/:song_id/comments``
 * **POST**  ``/songs/:song_id/like``
 * **POST**  ``/albums/:album_id/like``
 * **POST**  ``/playlists/:playlist_id/like``
 * **POST**  ``/comments/:comment_id/like``
 * **GET**  ``/users/:user_id`` 
 * **GET**  ``/session/follows`` 
 * **GET**  ``/songs``
 * **GET**  ``/songs/:song_id``
 * **GET**  ``/albums/:album_id``
 * **GET**  ``/playlists/:playlist_id``