from app.models import Album, db
from sqlalchemy.sql import text
from random import sample, randint

def album_seed_data(all_songs, all_users):
    album1 = Album(title="RomanSenykMusic", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/22-32-15-627_250x250.png", body="Album for Funky Fortune", user_id=1, release_date="2021-05-15", songs=[all_songs[0]])
    album2 = Album(title="Alex Grohl", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/11-21-45-402_200x200.jpg", body="Album for Hard Rock(Fireman)", user_id=1, release_date="2023-07-27", songs=[all_songs[1]])
    album3 = Album(title="lemonmusicstudio", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/07-01-09-228_200x200.png", body="Album for This World Has Gone Crazy", user_id=1, release_date="2021-03-08", songs=[all_songs[2]])
    album4 = Album(title="Gvidon", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/13-19-25-891_200x200.png", body="Album for Mesmerizing", user_id=1, release_date="2018-04-07", songs=[all_songs[3]])
    album5 = Album(title="lemonmusicstudio", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/07-01-09-228_200x200.png", body="Album for Get Some Street Cred Now!(Main) ", user_id=1, release_date="2017-05-05", songs=[all_songs[4]])
    album6 = Album(title="Top-Flow", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/12-58-05-333_200x200.png", body="Album for Speed Thrill Beat", user_id=1, release_date="2024-01-01", songs=[all_songs[5]])
    album7 = Album(title="Mark July", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/10-58-13-55_200x200.webp", body="Album for Powerful Stylish", user_id=1, release_date="2020-03-19", songs=[all_songs[6]])
    album8 = Album(title="AudioCoffee", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/14-48-41-91_200x200.jpg", body="Album for Wake up to the Renaissance", user_id=1, release_date="2021-05-09", songs=[all_songs[7]])
    album9 = Album(title="LiteSaturation", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/12-46-19-624_200x200.jpg", body="Album for Live Saturation", user_id=1, release_date="2022-08-09", songs=[all_songs[8]])
    album10 = Album(title="MVNoCopyrightMusic", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/15-29-35-455_200x200.png", body="Album for Iron Man", user_id=1, release_date="2014-09-09", songs=[all_songs[9]])
    album11 = Album(title="prazkhanal", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/09-43-51-852_200x200.png", body="Album for Whip", user_id=2, release_date="2023-10-10", songs=[all_songs[10]])
    album12 = Album(title="Music_Unlimited", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/10-43-43-53_200x200..png", body="Album for Happy Acoustic Guitar Background Music", user_id=2, release_date="2019-02-03", songs=[all_songs[11]])
    album13 = Album(title="Top-Flow", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/08-24-17-534_200x200.png", body="Album for Sunshine Jaunt", user_id=2, release_date="2019-06-17", songs=[all_songs[12]])
    album14 = Album(title="Twisterium", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/10-47-57-494_200x200.png", body="Album for Good Vibe", user_id=2, release_date="2016-10-10", songs=[all_songs[13]])
    album15 = Album(title="AlexiAction", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/00-24-24-157_200x200.png", body="Album for Electro Pop", user_id=2, release_date="2017-03-08", songs=[all_songs[14, 15]])
    album17 = Album(title="Yourtunes", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/11-08-32-667_200x200.png", body="Album for Energetic Upbeat Stylish Pop Fashion", user_id=2, release_date="2021-09-19", songs=[all_songs[16]])
    album18 = Album(title="BoDleasons", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/02-44-55-168_200x200.png", body="Album for Stay Free", user_id=2, release_date="2014-08-07", songs=[all_songs[17]])
    album19 = Album(title="FASSounds", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/02-44-55-168_200x200.png", body="Album for Life Inspired", user_id=2, release_date="2020-06-23", songs=[all_songs[18]])
    album20 = Album(title="Leonell Cassio", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/18-48-26-846_200x200.jpg", body="ALbum for Leonell Cassio - Night Sky (ft. Julia Mihevc)", user_id=2, release_date="2014-05-24", songs=[all_songs[19]])
    album21 = Album(title="Evgeny_Bardyuzha", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/18-48-26-846_200x200.jpg", body="ALbum for Password Infinity", user_id=3, release_date="2019-05-08", songs=[all_songs[20]])
    album22 = Album(title="Nesterouk", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/09-30-22-297_200x200.png", body="Album for My Universe", user_id=3, release_date="2010-05-16", songs=[all_songs[21]])
    album23 = Album(title="SergePavkinMusic", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/11-48-25-137_200x200.png", body="Album for A Long Way", user_id=3, release_date="2024-01-08", songs=[all_songs[22]])
    album24 = Album(title="The_Mountain", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/17-23-51-813_200x200.png", body="Album for For Future Bass", user_id=3, release_date="2009-10-20", songs=[all_songs[23]])
    album25 = Album(title="CINIM", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/13-08-36-813_200x200.png", body="Album for Brainfluid", user_id=3, release_date="2022-11-11", songs=[all_songs[24]])
    album26 = Album(title="AlisiaBeats", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/12-10-40-317_200x200.png", body="Album for Titanium", user_id=3, release_date="2023-01-28", songs=[all_songs[25]])
    album27 = Album(title="Ketyri", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/22-32-32-681_200x200.png", body="Album for To The Death", user_id=3, release_date="2022-12-21", songs=[all_songs[26]])
    album28 = Album(title="Leonell Cassio", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/14-20-22-426_200x200.png", body="Album for Leonell Cassio - Same Red (ft. Anne Lan)", user_id=3, release_date="2021-02-04", songs=[all_songs[27]])
    album29 = Album(title="AUDIOREZOUT", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/10-14-28-814_200x200.jpg", body="Album for Horrible (Aggressive Powerful Motivational Fight Intense Battle Music)", user_id=3, release_date="2021-10-22", songs=[all_songs[28]])
    album30 = Album(title="Music_Unlimited", album_pic="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/08-45-28-363_200x200.jpg", body="Album for Flamin (Energetic Future Bass)", user_id=3, release_date="2022-10-12", songs=[all_songs[29]])
    album31 = Album(title="Everything Now", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arcade+Fire+-+Everything+Now.jpg", body="Album for Everything Now", user_id=4, release_date="2021-10-09", songs=[all_songs[30]])
    album32 = Album(title="AM", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arctic+Monkeys.jpg", body="Album for Fireside", user_id=4, release_date="2002-03-23", songs=[all_songs[31, 32, 33, 34]])
    album36 = Album(title="From Under the Cork Tree", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Fall+Out+Boy+-+From+Under+the+Cork+Tree.jpg", body="Album for Dance, Dance", user_id=4, release_date="2022-07-10", songs=[all_songs[35]])
    album37 = Album(title="Echoes, Silence, Patience & Grace", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Foo+Fighters+-+Echoes%2C+Silence%2C+Patience+%26+Grace.jpg", body="Album for The Pretender", user_id=4, release_date="2021-08-09", songs=[all_songs[36]])
    album38 = Album(title="The Reason", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Hoobastank+-+The+Reason.jpg", body="Album for The Reason", user_id=4, release_date="2020-07-11", songs=[all_songs[37]])
    album39 = Album(title="Did you know that there's a tunnel under Ocean Blvd", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Lana+Del+Rey+-+Let+The+Light+In.jpg", body="Album for Let The Light In", user_id=4, release_date="2020-10-29", songs=[all_songs[38]])
    album40 = Album(title="Born To Die", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Lana+Del+Rey+-+Summertime+Sadness.jpg", body="Album for Summertime Sadness", user_id=4, release_date="2014-03-06", songs=[all_songs[39]])
    album41 = Album(title="N/A", album_pic="", body="Album for Knocked Off My Feet", user_id=5, release_date="2008-01-22", songs=[all_songs[40]])
    album42 = Album(title="Rigged", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Chelle+Ives+-+Elasticity.jpg", body="Album for Elasticity", user_id=5, release_date="2010-10-24", songs=[all_songs[41]])
    album43 = Album(title="Sumerian Paradise", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Dew+Of+Light+-+Sumerian+Paradise.jpg", body="Album for Sumerian Paradise", user_id=5, release_date="2021-06-04", songs=[all_songs[42]])
    album44 = Album(title="Epoch", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Dye+O+-+Epoch.jpg", body="Album for Bloom", user_id=5, release_date="2021-02-20", songs=[all_songs[43]])
    album45 = Album(title="Purple Voyager", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/ELFL+-+Purple+Voyager+Album.jpg", body="Album for Purple Voyager", user_id=5, release_date="2021-12-21", songs=[all_songs[44]])
    album46 = Album(title="Transhumanism", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/ELFL+-+Trans-Human-Ism.jpg", body="Album for Sunstorm", user_id=5, release_date="2019-08-17", songs=[all_songs[45]])
    album47 = Album(title="Butterfly", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Lofive+-+Butterfly.jpg", body="Album for Butterfly", user_id=5, release_date="2018-07-19", songs=[all_songs[46]])
    album48 = Album(title="Revised Beginning", album_pic="", body="Album for Reversed Beginning", user_id=5, release_date="2017-07-14", songs=[all_songs[47]])
    album49 = Album(title="N/A", album_pic="", body="Album for Fight It One More Night", user_id=5, release_date="2009-10-19", songs=[all_songs[48]])
    album50 = Album(title="Fast Life", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Uygar+Duzgun+-+Trapped+In+Time.jpg", body="Album for Trapped in Time", user_id=5, release_date="2021-05-29", songs=[all_songs[49]])
    album51 = Album(title="Classical Greatest Hits", album_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/classical-greatest-hits.jpg", body="Classical Greatest Hits", user_id=6, release_date="2018-06-20", songs=[all_songs[50, 51, 52, 53, 54, 55, 56, 57, 58, 59]])
    album61 = Album(title="Soundtrack for 'Spider-Man: Into the Spider-Verse'", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273e2e352d89826aef6dbd5ff8f.jpg", body="Album for Sunflower", user_id=7, release_date="2019-10-12", songs=[all_songs[60]])
    album62 = Album(title="Recovery", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273c08d5fa5c0f1a834acef5100.jpg", body="Album for Love The way you lie", user_id=7, release_date="2020-10-09", songs=[all_songs[61]])
    album63 = Album(title="8 Mile", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273eab40fc794b88b9d1e012578.jpg", body="Album for Lose Yourself", user_id=7, release_date="2009-10-22", songs=[all_songs[62]])
    album64 = Album(title="Furious 7", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b2734e5df11b17b2727da2b718d8.jpg", body="Album for See you again", user_id=7, release_date="2015-10-20", songs=[all_songs[63]])
    album65 = Album(title="The Blueprint 3", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273fec1b815bb3c50a64a90fd10.jpg", body="Album for Empire state of mind", user_id=7, release_date="2007-07-10", songs=[all_songs[64]])
    album66 = Album(title="Views", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b2739416ed64daf84936d89e671c.jpg", body="Album for One Dance", user_id=7, release_date="2009-10-22", songs=[all_songs[65]])
    album67 = Album(title="The Adventures of Bobby Ray", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273484d121f0e2d2caf87d5d10b.jpg", body="Album for Airplanes", user_id=7, release_date="2017-08-10", songs=[all_songs[66]])
    album68 = Album(title="Pink Friday", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273aa7d2641af0fa4c1f76fafbf.jpg", body="Album for Super Bass", user_id=7, release_date="2022-06-19", songs=[all_songs[67]])
    album69 = Album(title="Evolve", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b2735675e83f707f1d7271e5cf8a.jpg", body="Album for Believer", user_id=7, release_date="2010-09-08", songs=[all_songs[68]])
    album70 = Album(title="差不多先生专辑", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273d628572c9278c1860c45a73e.jpg", body="Album for '差不多先生'", user_id=7, release_date="2004-10-11", songs=[all_songs[69]])
    album71 = Album(title="Dream Your Life Away", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273a9929deb093a6617d2493b03.jpg", body="Album for Riptide", user_id=8, release_date="2019-08-09", songs=[all_songs[70]])
    album72 = Album(title="Native", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273e80e7dbce3996a1ae5967751.jpg", body="Album for Counting Stars", user_id=8, release_date="2018-04-20", songs=[all_songs[71]])
    album73 = Album(title="No.6 Collaborations Project", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b27373304ce0653c7758dd94b259.jpg", body="Album for Put It All on Me", user_id=8, release_date="2005-02-20", songs=[all_songs[72]])
    album74 = Album(title="Exodus", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273413a6c2c7b296d98171e5e21.jpg", body="Album for Is This Love", user_id=8, release_date="2023-06-29", songs=[all_songs[73]])
    album75 = Album(title="We Sing. We Dance. We Steal Things.", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273125b1a330b6f6100ab19dbed.jpg", body="Album for I'm Yours", user_id=8, release_date="2017-05-07", songs=[all_songs[74]])
    album76 = Album(title="Wanted on Voyage", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273d6df3bccf3ec41ea2f76debc.jpg", body="Album for Budapest", user_id=8, release_date="2006-05-30", songs=[all_songs[75]])
    album77 = Album(title="In Between Dreams", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b27306b42768ebe736eec21336ea.jpg", body="Album for Banana Pancakes", user_id=8, release_date="2009-11-23", songs=[all_songs[76]])
    album78 = Album(title="Save Me, San Francisco", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b2736ff8bc258e3ebc835ffe14ca.jpg", body="Album for Hey Soul Sister", user_id=8, release_date="2011-07-08", songs=[all_songs[77]])
    album79 = Album(title="Doo-Wops & Hooligans", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273f6b55ca93bd33211227b502b.jpg", body="Album for The Lazy Song", user_id=8, release_date="2017-03-21", songs=[all_songs[78]])
    album80 = Album(title="Ocean Eyes", album_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273785d4e702802da500fc78b32.jpg", body="Album for Fireflies", user_id=8, release_date="2023-02-20", songs=[all_songs[79]])
    album80 = Album(title="Country Greatest Hits", album_pic="", body="Country Greatest Hits", user_id=9, release_date="2003-08-12", songs=[all_songs[80, 81, 82, 83, 84, 85, 86, 87, 88, 89]])
    album81 = Album(title="Death of the Chosen Few", album_pic="https://tunetrax.s3.us-east-2.amazonaws.com/death-of-chosen-few-album.jpg", user_id=10, release_date="2016-07-07", songs=[all_songs[90, 91, 92, 93, 94, 95, 96]])
    album82 = Album(title="True Defiance", album_pic="https://tunetrax.s3.us-east-2.amazonaws.com/demon-hunter-true-defiance.jpg", user_id=10, release_date="2019-05-21", songs=[all_songs[97, 98]])
    album83 = Album(title="N/A", album_pic="", user_id=10, release_date="2013-07-11", songs=[all_songs[99]])
    
    all_albums = [album1, album2, album3, album4, album5, album6, album7, album8, album9, album10, album11, album12, album13, album14, album15, album17, album18, album19, album20, album21, album22, album23, album24, album25, album26, album27, album28, album29, album30, album31, album32, album36, album37, album38, album39, album40, album41, album42, album43, album44, album45, album46, album47, album48, album49, album50, album51, album61, album62, album63, album64, album65, album66, album67, album68, album69, album70, album71, album72, album73, album74, album75, album76, album77, album78, album79, album80, album81, album82, album83]
    
    for album in all_albums:
        album.user = all_users[album.user_id]
        album.likes = sample(all_users, randint(0, len(all_users)))

    db.session.add_all(all_albums)
    db.session.commit()

def undo_album_seeds():
    db.session.execute(text("DELETE FROM albums"))
    db.session.commit()
