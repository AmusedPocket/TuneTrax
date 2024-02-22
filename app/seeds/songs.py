from app.models import Song, db
from sqlalchemy.sql import text
from random import sample, randint

def song_seed_data(all_users):
    song1 = Song(title="Funky Fortune", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/funky-fortune-154575.mp3", song_pic="", body="Funky Fortune - groovy funk background track featuring electric guitar, bass, organ, synth, claps and drums that creates cool, funky, dancey and a bit retro mood.", genre="Rock", visibility=True, user_id=1)
    song2 = Song(title="Hard Rock (Fireman)", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/hard-rock-fireman-15041.mp3", song_pic="", body="Thunderous riffs clash with pounding drums in a relentless onslaught of raw energy, as the vocals scream defiance into the chaos, creating a hard rock anthem that shakes the very foundations of rebellion.", genre="Rock", visibility=True, user_id=1)
    song3 = Song(title="This World Has Gone Crazy", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/this-world-has-gone-crazy-15500.mp3", song_pic="", body="An explosive fusion of electrifying guitars and thunderous drums fuels a hard rock anthem that pulses with rebellion, while the gritty vocals roar with unbridled passion, setting the stage for a sonic uprising.", genre="Rock", visibility=True, user_id=1)
    song4 = Song(title="Get Some Street Cred Now!(Main)", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/get-some-street-cred-nowmain-125842.mp3", song_pic="", body="Crashing waves of guitar distortion meet thunderous percussion in a hard rock powerhouse, where defiant vocals soar above the chaos, forging an anthem of rebellion and resilience.", genre="Rock", visibility=True, user_id=1)
    song5 = Song(title="Speed Thrill Beat", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/speed-thrill-beat-190669.mp3   ", song_pic="", body="In a storm of relentless guitar riffs and thunderous drum beats, the vocals scream with raw intensity, delivering a hard rock anthem that ignites the spirit of rebellion and defiance.", genre="Rock", visibility=True, user_id=1)
    song6 = Song(title="Powerful Stylish Stomp Rock (Lets Go)", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/powerful-stylish-stomp-rock-lets-go-114255.mp3", song_pic="", body="Hard and energetic upbeat indie rock track with catchy, agressive guitar riff. Strong beat with stomps and claps bring more confidence and power to this music.", genre="Rock", visibility=True, user_id=1)
    song7 = Song(title="Wake up to the Renaissance", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/wake-up-to-the-renaissance-135540.mp3", song_pic="", body="This instrumental rock track captivates with its dynamic guitar melodies and powerful drum rhythms, evoking a journey through rugged landscapes and untamed emotions with each resounding chord.", genre="Rock", visibility=True, user_id=1)
    song8 = Song(title="Rockstar Trailer", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/rockstar-trailer-109945.mp3", song_pic="", body="This hard rock instrumental commands attention with its blistering guitar riffs and thunderous drumming, delivering an adrenaline-fueled sonic assault that ignites the senses and leaves listeners craving more.", genre="Rock", visibility=True, user_id=1)
    song9 = Song(title="Iron Man", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/iron-man-190508.mp3", song_pic="", body="Action and powerful motivational rock tune with a touch of the western. ", genre="Rock", visibility=True, user_id=1)
    song10 = Song(title="Mesmerizing", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/mesmerizing-15617.mp3", song_pic="", body="In a whirlwind of searing guitar solos and relentless drumming, the gritty vocals deliver a powerful message of defiance and rebellion, making this hard rock song an electrifying anthem for those who refuse to be silenced.", genre="Rock", visibility=True, user_id=1)
    song11 = Song(title="Whip", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/whip-110235.mp3", song_pic="", body="This pop song sparkles with infectious melodies and catchy hooks, backed by pulsating beats that invite listeners to dance their cares away and embrace the euphoria of the moment.", genre="Pop", visibility=True, user_id=2)
    song12 = Song(title="Happy Acoustic Guitar Background Music", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/happy-acoustic-guitar-background-music-122614.mp3", song_pic="", body="This pop anthem shimmers with irresistible melodies and upbeat rhythms, weaving a tapestry of feel-good vibes that beckon listeners to sing along and lose themselves in the joyous rhythm of the music.", genre="Pop", visibility=True, user_id=2)
    song13 = Song(title="Sunshine Jaunt", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/sunshine-jaunt-163686.mp3", song_pic="", body="This pop sensation bursts with vibrant melodies and infectious beats, crafting a euphoric atmosphere that sweeps listeners into a world of carefree bliss and endless possibilities.", genre="Pop", visibility=True, user_id=2)
    song14 = Song(title="Good Vibe", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/good-vibe-7669.mp3", song_pic="", body="Brimming with infectious melodies and pulsating beats, this pop sensation sets the stage for a euphoric journey into a world of carefree bliss and endless possibilities.", genre="Pop", visibility=True, user_id=2)
    song15 = Song(title="Electro Pop", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/electro-pop-124340.mp3", song_pic="", body="Radiating with vibrant melodies and infectious rhythms, this pop anthem invites listeners to surrender to its irresistible groove and immerse themselves in a realm of boundless joy and exhilaration.", genre="Pop", visibility=True, user_id=2)
    song16 = Song(title="Synthwave 80s", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/synthwave-80s-110045.mp3", song_pic="", body="Filled with catchy hooks and upbeat rhythms, this pop sensation beckons listeners to embrace its infectious energy and lose themselves in a whirlwind of euphoria and excitement.", genre="Pop", visibility=True, user_id=2)
    song17 = Song(title="Energetic Upbeat Stylish Pop Fashion", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/energetic-upbeat-stylish-pop-fashion-136514.mp3", song_pic="", body="Cool modern indie electro pop track with piano, drums, bass, brass and synths. ", genre="Pop", visibility=True, user_id=2)
    song18 = Song(title="Stay Free", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/stay-free-138363.mp3", song_pic="", body="Overflowing with catchy melodies and pulsating rhythms, this pop masterpiece envelops listeners in an irresistible wave of euphoria, inviting them to surrender to the infectious joy of the music.", genre="Pop", visibility=True, user_id=2)
    song19 = Song(title="Life Inspired", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/life-inspired-112778.mp3", song_pic="", body="Drenched in catchy melodies and pulsating rhythms, this pop sensation sweeps listeners into a world of infectious energy and boundless euphoria, where every beat ignites a dance of unbridled joy.", genre="Pop", visibility=True, user_id=2)
    song20 = Song(title="Leonell Cassio - Night Sky (ft. Julia Mihevc)", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/leonell-cassio-night-sky-ft-julia-mihevc-118759.mp3", song_pic="", body="Bringing forth catchy melodies and infectious rhythms, this pop anthem lights up the airwaves with an irresistible energy, captivating listeners in a whirlwind of euphoria and endless celebration.", genre="Pop", visibility=True, user_id=2)
    song21 = Song(title="Password Infinity", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/password-infinity-123276.mp3", song_pic="", body="Pulsating with electrifying beats and hypnotic synths, this electronic masterpiece transports listeners to a mesmerizing realm where vibrant melodies and pulsating rhythms collide, creating an immersive sonic journey that pulses with energy and excitement.", genre="Electronic", visibility=True, user_id=3)
    song22 = Song(title="My Universe", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/my-universe-147152.mp3", song_pic="", body="Infused with pulsating beats and captivating synths, this electronic anthem propels listeners into a mesmerizing sonic landscape, where immersive melodies and rhythmic pulses intertwine to create an exhilarating journey through the electrifying realms of sound.", genre="Electronic", visibility=True, user_id=3)
    song23 = Song(title="A Long Way", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/a-long-way-166385.mp3", song_pic="", body="Crafted with pulsating beats and ethereal synths, this electronic marvel transports listeners to a euphoric dimension where vibrant melodies and hypnotic rhythms converge, igniting a sensory journey through the boundless realms of sound and emotion.", genre="Electronic", visibility=True, user_id=3)
    song24 = Song(title="For Future Bass", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/for-future-bass-159125.mp3", song_pic="", body="With its pulsating beats and atmospheric synths, this electronic opus invites listeners to embark on a transcendent journey through pulsating rhythms and immersive melodies, evoking a captivating fusion of energy and emotion.", genre="Electronic", visibility=True, user_id=3)
    song25 = Song(title="Brainfluid", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/cinim-brainfluid-122844.mp3", song_pic="", body="In a sonic odyssey of pulsating beats and mesmerizing synths, this electronic marvel beckons listeners into an ethereal realm where rhythmic pulses and immersive melodies intertwine, crafting an electrifying fusion of sound and sensation that captivates the senses.", genre="Electronic", visibility=True, user_id=3)
    song26 = Song(title="Titanium", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/titanium-170190.mp3", song_pic="", body="Embark on a sonic voyage through pulsating beats and mesmerizing synths with this electronic masterpiece. As rhythmic pulses and immersive melodies collide, a captivating fusion of sound and sensation unfolds, transporting listeners to an ethereal realm of electrifying harmony.", genre="Electronic", visibility=True, user_id=3)
    song27 = Song(title="To The Death", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/to-the-death-159171.mp3", song_pic="", body="Dive into a world of pulsating beats and enchanting synths with this electronic sensation. As rhythmic pulses and immersive melodies intertwine, listeners are whisked away on a mesmerizing journey through an electrifying fusion of sound and sensation.", genre="Electronic", visibility=True, user_id=3)
    song28 = Song(title="Leonell Cassio - Same Red (ft. Anne Lan)", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/leonell-cassio-same-red-ft-anne-lan-119071.mp3", song_pic="", body="Journey through a realm of pulsating beats and hypnotic synths with this electronic gem. As rhythmic pulses and immersive melodies collide, listeners are transported into an ethereal space where sound and sensation converge in electrifying harmony.", genre="Electronic", visibility=True, user_id=3)
    song29 = Song(title="Horrible (Aggressive Powerful Motivational Fight Intense Battle Music)", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/horrible-aggressive-powerful-motivational-fight-intense-battle-music-187013.mp3", song_pic="", body="Step into the mesmerizing realm of pulsating beats and captivating synths with this electronic masterpiece. As rhythmic pulses and immersive melodies intertwine, listeners embark on an exhilarating journey through a kaleidoscope of sound and sensation.", genre="Electronic", visibility=True, user_id=3)
    song30 = Song(title="Flamin (Energetic Future Bass)", song_link="https://tunetrax-songs.s3.us-west-2.amazonaws.com/flamin-energetic-future-bass-121568.mp3", song_pic="", body="Immerse yourself in a world of pulsating beats and entrancing synths with this electronic marvel. As rhythmic pulses and immersive melodies intertwine, listeners are swept away on a captivating journey through an electrifying fusion of sound and emotion.", genre="Electronic", visibility=True, user_id=3)
    song31 = Song(title="Everything Now", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arcade+Fire+-+Everything+Now.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arcade+Fire+-+Everything+Now.jpg", body="Arcade Fire does it again with the release of Everything Now. Listeners can expect to be transported into a groovy trance with this song!", genre="Alternative", visibility=True, user_id=4)
    song32 = Song(title="Fireside", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arctic+Monkeys+-+Fireside.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arctic+Monkeys.jpg", body="Arctic Monkeys on the hit album AM.", genre="Alternative", visibility=True, user_id=4)
    song33 = Song(title="I Wanna Be Yours", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arctic+Monkeys+-+I+Wanna+Be+Yours.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arctic+Monkeys.jpg", body="Arctic Monkeys on the hit album AM.", genre="Alternative", visibility=True, user_id=4)
    song34 = Song(title="R U Mine?", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arctic+Monkeys+-+R+U+Mine.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arctic+Monkeys.jpg", body="Arctic Monkeys on the hit album AM.", genre="Alternative", visibility=True, user_id=4)
    song35 = Song(title="Why'd You Only Call Me When You're High", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arctic+Monkeys+-+Why'd+You+Only+Call+Me+When+You're+High.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Arctic+Monkeys.jpg", body="Arctic Monkeys on the hit album AM.", genre="Alternative", visibility=True, user_id=4)
    song36 = Song(title="Dance, Dance", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Fall+Out+Boy+-+Dance%2C+Dance.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Fall+Out+Boy+-+Dance%2C+Dance.jpg", body="This iconic track from Fall Out Boy ravaged the scene on its release, listen to the track that influenced many Alt-Rock and Pop musicians!", genre="Alternative", visibility=True, user_id=4)
    song37 = Song(title="The Pretender", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Foo+Fighters+-+The+Pretender.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Foo+Fighters+-+The+Pretender.jpg", body="The Foo Fighters strike again with a classic from the Alt-Rock genre. Are you ready?!", genre="Alternative", visibility=True, user_id=4)
    song38 = Song(title="The Reason", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Hoobastank+-+The+Reason.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Hoobastank+-+The+Reason.jpg", body="A song from the perfect band of imperfect persons, Hoobastank. A song that will remain on forever repeat, something we must live with everyday!", genre="Alternative", visibility=True, user_id=4)
    song39 = Song(title="Let The Light In ", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Lana+Del+Rey+-+Let+The+Light+In+ft.+Father+John+Misty.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Lana+Del+Rey+-+Let+The+Light+In.jpg", body="The song that should have given Lana Del Rey her first Emmy, if her fans had anything to say about it!", genre="Alternative", visibility=True, user_id=4)
    song40 = Song(title="Summertime Sadness", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Lana+Del+Rey+-+Summertime+Sadness.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Lana+Del+Rey+-+Summertime+Sadness.jpg", body="A huge hit from Lana Del Rey in the early 2010s!", genre="Alternative", visibility=True, user_id=4)
    song41 = Song(title="Knocked Off My Feet", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Barbatula+-+Knocked+Off+My+Feet.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Barbatula+-+Knocked+Off+My+Feet.jpg", body="The beats in this song transport the listener to a new place while they listen. Another hit from Barbatula!", genre="Hauntology", visibility=True, user_id=5)
    song42 = Song(title="Elasticity", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Chelle+Ives+-+Elasticity.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Chelle+Ives+-+Elasticity.jpg", body="Chelle Ives tests the boundaries of electronic music with this Hauntology hit, Elasticity.", genre="Hauntology", visibility=True, user_id=5)
    song43 = Song(title="Sumerian Paradise", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Dew+Of+Light+-+Sumerian+Paradise.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Dew+Of+Light+-+Sumerian+Paradise.jpg", body="Sumerian Paradise is a wonderful trance track from the band Dew of Light.", genre="Hauntology", visibility=True, user_id=5)
    song44 = Song(title="Bloom", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Dye+O+-+Bloom.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Dew+Of+Light+-+Sumerian+Paradise.jpg", body="Dye O has released a song that captures the midpoint between Lofi and EDM in this track named Bloom.", genre="Hauntology", visibility=True, user_id=5)
    song45 = Song(title="Purple Voyager", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/ELFL+-+Purple+Voyager.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/ELFL+-+Purple+Voyager.jpg", body="This Retro inspired track aludes to the 80's era of music in Electronic form, enjoy this track created by ELFL", genre="Hauntology", visibility=True, user_id=5)
    song46 = Song(title="Sunstorm", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/ELFL+-+Sunstorm.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/ELFL+-+Sunstorm.webp", body="ELFL has done it again with this release of Sunstorm. Listen now!", genre="Hauntology", visibility=True, user_id=5)
    song47 = Song(title="Butterfly", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Lofive+-+Butterfly.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Lofive+-+Butterfly.jpg", body="Reversed Beginning", genre="Hauntology", visibility=True, user_id=5)
    song48 = Song(title="Reversed Beginning", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Luwaks+-+Reversed+Beginning.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Luwaks+-+Reversed+Beginning.jpg", body="Get transported to a new realm with this track from Luwaks. Great for productivity!", genre="Hauntology", visibility=True, user_id=5)
    song49 = Song(title="Fight It One More Night", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Mama+Zula+-+Fight+It+One+More+Night.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Mama+Zula+-+Fight+It+One+More+Night.jpg", body="This upbeat song from Mama Zula comes with great vocals and a sax that gets your hips moving!", genre="Hauntology", visibility=True, user_id=5)
    song50 = Song(title="Trapped in Time", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Uygar+Duzgun+-+Trapped+In+Time.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Uygar+Duzgun+-+Trapped+In+Time.jpg", body="Mixing trap beats with synthwave electronic music this track by Uygar Duzgun is a must have in any energizing playlist.", genre="Hauntology", visibility=True, user_id=5)
    song51 = Song(title="Für Elise", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Beethoven+-+F%C3%BCr+Elise.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Beethoven.jpg", body="A classic from Beethoven himself. Although not published in his lifetime, Für Elise was found 40 years after his passing and has since then been a staple in Beethovens discography.", genre="Classical", visibility=True, user_id=6)
    song52 = Song(title="Largo Opera", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Handel+-+Largo+Opera.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Handel.jpg", body="An opera as written by George Frideric Handel.", genre="Classical", visibility=True, user_id=6)
    song53 = Song(title="Sarabande", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Handel+-+Sarabande.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Handel.jpg", body="A piece performed as written by George Frideric Handel.", genre="Classical", visibility=True, user_id=6)
    song54 = Song(title="Waltz for Violin", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Johannes+Brahms+-+Waltz.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Johannes+Brahms.jpg", body="A waltz written by Johannes Brahms.", genre="Classical", visibility=True, user_id=6)
    song55 = Song(title="O Mio Babbino Caro", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Maria+Callas+-+Puccini+-+O+mio+babbino+caro.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Puccini.jpg", body="An opera piece performed by Maria Callas and written by Giacomo Puccini", genre="Classical", visibility=True, user_id=6)
    song56 = Song(title="Eine Kleine Nachtmusik", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Mozart+-+Eine+Kleine+Nachtmusik.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Mozart.jpg", body="A piece from the great Wolfgang Amadeus Mozart.", genre="Classical", visibility=True, user_id=6)
    song57 = Song(title="Barcarolle from 'The Tales of Hoffman'", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Offenbach+-+Barcarolle+%2C+from+'The+Tales+of+Hoffmann'.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Jacques-Offenbach.jpg", body="An arrangment from Jacques Offenbach written for the opéra fantastique 'The Tales of Hoffman'.", genre="Classical", visibility=True, user_id=6)
    song58 = Song(title="Carnival of the Animals", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Saint-Saens+-+Carnival+of+the+Animals.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Saint-Saens.jpg", body="A piece from the symphony Carnival of the Animals written by Camille Saint-Saëns.", genre="Classical", visibility=True, user_id=6)
    song59 = Song(title="The Blue Danube Waltz", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Strauss++The+Blue+Danube+Waltz.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Strauss.jpg", body="A waltz written by Johann Strauss II.", genre="Classical", visibility=True, user_id=6)
    song60 = Song(title="None But The Lonely Hearts", song_link="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Tchaikovsky+-+None+But+The+Lonely+Hearts.mp3", song_pic="https://whiffkin-tunetrax-songs.s3.amazonaws.com/Tchaikovsky.jpg", body="A piece written by Pyotr Ilyich Tchaikovsky.", genre="Classical", visibility=True, user_id=6)
    song61 = Song(title="Sunflower", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Sunflower+-+Spider-Man_+Into+the+Spider-Verse.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273e2e352d89826aef6dbd5ff8f.jpg", body="'Sunflower' by Post Malone and Swae Lee is a laid-back hip-hop/pop collaboration with a catchy melody, creating a chill and feel-good vibe.", genre="Rap", visibility=True, user_id=7)
    song62 = Song(title="Love The way you lie", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Love+The+Way+You+Lie.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273c08d5fa5c0f1a834acef5100.jpg", body="'Love the Way You Lie' is a powerful collaboration between Eminem and Rihanna, blending rap and pop to explore the complexities of love and relationships.", genre="Rap", visibility=True, user_id=7)
    song63 = Song(title="Lose Yourself", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Lose+Yourself.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273eab40fc794b88b9d1e012578.jpg", body="Eminem's 'Lose Yourself' is a high-energy rap anthem that encapsulates the determination and intensity needed to seize the moment.", genre="Rap", visibility=True, user_id=7)
    song64 = Song(title="See you again", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+See+You+Again+(feat.+Charlie+Puth).mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b2734e5df11b17b2727da2b718d8.jpg", body="'See You Again' by Wiz Khalifa featuring Charlie Puth is an emotional rap/pop tribute, capturing the sentiment of loss and remembrance.", genre="Rap", visibility=True, user_id=7)
    song65 = Song(title="Empire state of mind", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Empire+State+Of+Mind.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273fec1b815bb3c50a64a90fd10.jpg", body="'Empire State of Mind' by Jay-Z and Alicia Keys is a hip-hop classic that pays homage to the vibrancy and diversity of New York City.", genre="Rap", visibility=True, user_id=7)
    song66 = Song(title="One Dance", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+One+Dance.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b2739416ed64daf84936d89e671c.jpg", body="Drake's 'One Dance' is a smooth fusion of dancehall and R&B, creating a laid-back, infectious groove that's perfect for the dance floor.", genre="Rap", visibility=True, user_id=7)
    song67 = Song(title="Airplanes", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Airplanes+(feat.+Hayley+Williams+of+Paramore).mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273484d121f0e2d2caf87d5d10b.jpg", body="'Airplanes' by B.o.B featuring Hayley Williams is a heartfelt blend of rap and pop, exploring themes of dreams and aspirations against a melodic backdrop.", genre="Rap", visibility=True, user_id=7)
    song68 = Song(title="Super Bass", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Super+Bass.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273aa7d2641af0fa4c1f76fafbf.jpg", body="Nicki Minaj's 'Super Bass' is a catchy blend of pop and hip-hop, featuring playful lyrics and an infectious rhythm that's perfect for any occasion.", genre="Rap", visibility=True, user_id=7)
    song69 = Song(title="Believer", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Believer.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b2735675e83f707f1d7271e5cf8a.jpg", body="Imagine Dragons' 'Believer' is a powerful rock anthem that combines energetic beats with uplifting lyrics, leaving a lasting impact.", genre="Rap", visibility=True, user_id=7)
    song70 = Song(title="差不多先生", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+%E5%B7%AE%E4%B8%8D%E5%A4%9A%E5%85%88%E7%94%9F.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273d628572c9278c1860c45a73e.jpg", body="This song '差不多先生' is a rap masterpiece that captivates with its unique blend of beats and insightful lyrics, creating an unforgettable musical experience.", genre="Rap", visibility=True, user_id=7)
    song71 = Song(title="Riptide", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Riptide.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273a9929deb093a6617d2493b03.jpg", body="Vance Joy's 'Riptide' is a ukulele-driven indie folk gem with a breezy, carefree vibe that captures the essence of seaside serenity.", genre="Indie", visibility=True, user_id=8)
    song72 = Song(title="Counting Stars", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Counting+Stars.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273e80e7dbce3996a1ae5967751.jpg", body="OneRepublic's 'Counting Stars' is a pop-rock anthem that combines uplifting melodies with introspective lyrics, creating a dynamic and captivating sound.", genre="Indie", visibility=True, user_id=8)
    song73 = Song(title="Put It All on Me", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Put+It+All+on+Me+(feat.+Ella+Mai).mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b27373304ce0653c7758dd94b259.jpg", body="Ed Sheeran's 'Put It All on Me' is a heartfelt pop ballad that explores the theme of love, featuring Ed's signature acoustic style and emotional storytelling.", genre="Indie", visibility=True, user_id=8)
    song74 = Song(title="Is This Love", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Is+This+Love.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273413a6c2c7b296d98171e5e21.jpg", body="Bob Marley's 'Three Little Birds' is a reggae masterpiece that radiates positivity and relaxation, delivering a timeless message of reassurance.", genre="Indie", visibility=True, user_id=8)
    song75 = Song(title="I'm Yours", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+I'm+Yours.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273125b1a330b6f6100ab19dbed.jpg", body="Jason Mraz's 'I'm Yours' is a feel-good acoustic pop hit with a laid-back, summery vibe, capturing the essence of love and simplicity.", genre="Indie", visibility=True, user_id=8)
    song76 = Song(title="Budapest", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Budapest.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273d6df3bccf3ec41ea2f76debc.jpg", body="George Ezra's 'Budapest' is a folk-pop anthem that combines soulful vocals with a catchy melody, painting a vivid picture of longing and wanderlust.", genre="Indie", visibility=True, user_id=8)
    song77 = Song(title="Banana Pancakes", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Banana+Pancakes.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b27306b42768ebe736eec21336ea.jpg", body="Jack Johnson's 'Banana Pancakes' is a laid-back acoustic tune that exudes warmth and coziness, perfect for lazy mornings and a carefree atmosphere.", genre="Indie", visibility=True, user_id=8)
    song78 = Song(title="Hey Soul Sister", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Hey%2C+Soul+Sister.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b2736ff8bc258e3ebc835ffe14ca.jpg", body="Train's 'Hey Soul Sister' is a pop-rock anthem with a catchy, upbeat melody and soulful lyrics, capturing the essence of a joyful and carefree spirit.", genre="Indie", visibility=True, user_id=8)
    song79 = Song(title="The Lazy Song", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+The+Lazy+Song.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273f6b55ca93bd33211227b502b.jpg", body="Bruno Mars' 'The Lazy Song' is a playful pop track that celebrates the joy of taking it easy, featuring a laid-back vibe and carefree lyrics.", genre="Indie", visibility=True, user_id=8)
    song80 = Song(title="Fireflies", song_link="https://group-project-kai-album.s3.us-west-1.amazonaws.com/spotifydown.com+-+Fireflies.mp3", song_pic="https://group-project-kai-album.s3.us-west-1.amazonaws.com/ab67616d0000b273785d4e702802da500fc78b32.jpg", body="Owl City's 'Fireflies' is an electro-pop sensation with dreamy melodies and whimsical lyrics, creating a magical and nostalgic atmosphere.", genre="Indie", visibility=True, user_id=8)
    song81 = Song(title="Little Bitty", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Alan+Jackson++Little+Bitty+Official+Music+Video.mp3", song_pic="https://tunetrax.s3.us-east-2.amazonaws.com/little-bitty.jpg", body="Country song from Alan Jackson", genre="Country", visibility=True, user_id=9)
    song82 = Song(title="Carrying Your Love With Me", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/George+Strait++Carrying+Your+Love+With+Me+Official+Music+Video+HD.mp3", song_pic="https://tunetrax.s3.us-east-2.amazonaws.com/cylwm-georgestrait.jpg", body="Country song from George Strait", genre="Country", visibility=True, user_id=9)
    song83 = Song(title="Boot Scootin Boogie", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Brooks++Dunn++Boot+Scootin+Boogie+Official+Video.mp3", song_pic="https://tunetrax.s3.us-east-2.amazonaws.com/boot-scoot.jpg", body="Country song from Brooks & Dunn", genre="Country", visibility=True, user_id=9)
    song84 = Song(title="How Do You Like Me Now", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Toby+Keith++How+Do+You+Like+Me+Now.mp3", song_pic="https://tunetrax.s3.us-east-2.amazonaws.com/Toby_Keith-How_Do_You_Like_Me_Now-Frontal.jpg", body="Country song from Toby Keith", genre="Country", visibility=True, user_id=9)
    song85 = Song(title="Honey Bee", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Blake+Shelton++Honey+Bee+Official+Music+Video.mp3", song_pic="https://tunetrax.s3.us-east-2.amazonaws.com/honey-bee-song.jpg", body="Country song from Blake Shelton", genre="Country", visibility=True, user_id=9)
    song86 = Song(title="T-R-O-U-B-L-E", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/TROUBLE.mp3", song_pic="https://tunetrax.s3.us-east-2.amazonaws.com/t-r-o-u-b-l-e.jpg", body="Country song from Travis Trit", genre="Country", visibility=True, user_id=9)
    song87 = Song(title="Knee-Deep", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Knee+Deep+feat+Jimmy+Buffett.mp3", song_pic="https://tunetrax.s3.us-east-2.amazonaws.com/knee-deep-zack.jpg", body="Country song from Zac Brown Band", genre="Country", visibility=True, user_id=9)
    song88 = Song(title="Up There Down Here", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Jake+Owen++Up+There+Down+Here+Official+Music+Video.mp3", song_pic="https://tunetrax.s3.us-east-2.amazonaws.com/up-there-down-here.jpg", body="Country song from Jake Owen", genre="Country", visibility=True, user_id=9)
    song89 = Song(title="Big Green Tractor", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Jason+Aldean++Big+Green+Tractor+Lyric+Video.mp3", song_pic="https://tunetrax.s3.us-east-2.amazonaws.com/big-green-tractor-song.jpg", body="Country song from Jason Aldean", genre="Country", visibility=True, user_id=9)
    song90 = Song(title="She's Country", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Jason+Aldean++Shes+Country+Music+Video.mp3", song_pic="https://tunetrax.s3.us-east-2.amazonaws.com/she's-country.jpg", body="Country song from Jason Aldean", genre="Country", visibility=True, user_id=9)
    song91 = Song(title="Death of the Chosen Few", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Blake+Shelton++Honey+Bee+Official+Music+Video.mp3", song_pic="", body="Metal song from Sam Gorski", genre="Metal", visibility=True, user_id=10)
    song92 = Song(title="Three Fates", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Sam+Gorski++Three+Fates.mp3", song_pic="", body="Metal song from Sam Gorski", genre="Metal", visibility=True, user_id=10)
    song93 = Song(title="Ruins of Yore", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Sam+Gorski++Ruins+of+Yore.mp3", song_pic="", body="Metal song from Sam Gorski", genre="Metal", visibility=True, user_id=10)
    song94 = Song(title="Old As Wise", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Sam+Gorski++Old+As+Wise.mp3", song_pic="", body="Metal song from Sam Gorski", genre="Metal", visibility=True, user_id=10)
    song95 = Song(title="War Beast Feeds", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Sam+Gorski++War+Beast+Feeds.mp3", song_pic="", body="Metal song from Sam Gorski", genre="Metal", visibility=True, user_id=10)
    song96 = Song(title="Procession", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Sam+Gorski++Procession.mp3", song_pic="", body="Metal song from Sam Gorski", genre="Metal", visibility=True, user_id=10)
    song97 = Song(title="Tower of Worms", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Sam+Gorski++Tower+of+Worms.mp3", song_pic="", body="Metal song from Sam Gorski", genre="Metal", visibility=True, user_id=10)
    song98 = Song(title="Someone to Hate", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Demon+Hunter+Someone+To+Hate+Lyric+Video.mp3", song_pic="", body="Metal song from Demon Hunter", genre="Metal", visibility=True, user_id=10)
    song99 = Song(title="We Don't Care", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Demon+Hunter+09++We+Dontt+Care.mp3", song_pic="", body="Metal song from Demon Hunter", genre="Metal", visibility=True, user_id=10)
    song100 = Song(title="Enmity", song_link="https://tunetrax.s3.us-east-2.amazonaws.com/Awake+Again++Enmity+OFFICIAL+LYRIC+VIDEO.mp3", song_pic="https://tunetrax.s3.us-east-2.amazonaws.com/Awake-Again.jpg", body="Metal song from Awake Again", genre="Metal", visibility=True, user_id=10)

    all_songs = [song1, song2, song3, song4, song5, song6, song7, song8, song9, song10, song11, song12, song13, song14, song15, song16, song17, song18, song19, song20, song21, song22, song23, song24, song25, song26, song27, song28, song29, song30, song31, song32, song33, song34, song35, song36, song37, song38, song39, song40, song41, song42, song43, song44, song45, song46, song47, song48, song49, song50, song51, song52, song53, song54, song55, song56, song57, song58, song59, song60, song61, song62, song63, song64, song65, song66, song67, song68, song69, song70, song71, song72, song73, song74, song75, song76, song77, song78, song79, song80, song81, song82, song83, song84, song85, song86, song87, song88, song89, song90, song91, song92, song93, song94, song95, song96, song97, song98, song99, song100]

    for song in all_songs:
        song.user = all_users[song.user_id]
        song.likes = sample(all_users, randint(0, len(all_users)))

    db.session.add_all(all_songs)
    db.session.commit()
    return all_songs

def undo_song_seeds():
    db.session.execute(text("DELETE FROM songs"))
    db.session.execute(text("DELETE FROM song_likes"))
    db.session.commit()



