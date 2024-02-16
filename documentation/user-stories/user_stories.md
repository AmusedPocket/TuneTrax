# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-in form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent songs.
      * So that I can easily log out to keep my information secure.

## Songs

### Create Songs

* As a logged in user, I want to be able to post new Songs.
  * When I'm on the `/new-song` page:
    * I can post a new song.
      * Able to specify: Title, Genre, Additional Tags (30 max), Description, Caption, Privacy (Public or Private).
      * Able to upload: Image.

### Viewing Songs

* As a logged out user, I want to be able to view a selection of the most recent Songs.
  * When I'm on the `/discover` page:
    * I can view Recently Added Music and Genre's.

* As a logged in user, I want to be able to view a custom home page containing:
* When I'm on the `/discover` page:
    * I can view Today's Mixes, Recently Played, Genre's, Liked Songs.

* As a logged in _or_ logged out user, I want to be able to view a specific song and its associated comments and likes.
  * When I'm on the `/:username/:songname` page:
    * I can play the song, see comments on the song at the timestamp, like the song, song description, tags, artist.
      * So that I can read and interact with the comments of other users, and add my own comments.

### Updating Songs

* As a logged in user, I want to be able to edit my Songs by clicking an Edit button associated with the song anywhere that song appears.
  * When I'm on the `/:username`, `/:username/:songname`, or `/:username/sets/:songname` pages:
    * I can click "Edit" to make permanent changes to the song.
      * So that I can fix any errors I make in my song uploads, replace the file, etc..

### Deleting Songs

* As a logged in user, I want to be able to delete my Songs by clicking a Delete button associated with the song anywhere that song appears.
    * When I'm on the `/:username`, `/:username/:songname`, or `/:username/sets/:songname` pages:
    * I can click "Delete" to make permanent changes to the song.
      * So that I can delete the song if needed.

## Playlists

### Playlist Homepage

* As a logged in user _or_logged out, I want to be able to view all of the playlists I have made under the playlist homepage `/:username/sets`. 
* Playlist tile will have:
  * Album cover of the first song.
  * Username (small font)
  * Name of Playlist (large font)
  * List of songs in the playlist 
  * Playcount for each song

* As a logged in user, I will be able to view the above in addition to:
  * Edit Options (Share, Copy Link, Edit, Like, Add to queue, Delete Playlist)

### Playlist Page

* As a logged in user _or_ logged out, when navigating to the page of the playlist `/:username/sets/:playlistname` I will see the specifics of that playlist.
* Playlist page will have:
  * Playlist name
  * Username
  * Date created (how many hours ago)
  * Album cover image
  * User icon
  * Tags for playlist
  * Songs in playlist with playcount by it

* As a logged in user, I will be able to view the above in addition to:
  * Options tile (Share, Link, Edit, Like, Add to queue, Delete Playlist)

## Albums

## Album Main Page

* As a logged in _or_ logged out user, I can see a list of albums by a particular artist `/:username/albums`. I will see the specifics of each album listed along with options:
* Album will contain:
  * Album Cover
  * Usernmae
  * Album Name
  * List of songs
  * Options tile (Favorite, Copy Link, Add to queue)

* As a logged in user, I will see the above along with an edit option that will allow:
  * Edit the album
  * Delete the album






