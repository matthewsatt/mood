from app.models import db, Song


# Every song the seeders know about. Audio is hosted on Cloudinary.
SONGS = {
    'bored_to_death': dict(
        name='Bored To Death',
        artist='Blink-182',
        rating=7,
        song_url='https://res.cloudinary.com/matthewsatterwhite/video/upload/v1645634742/blink-182_-_Bored_To_Death_Official_Video_uohps1.mp4'),
    'nothing_inside': dict(
        name='Nothing Inside',
        artist='MGK',
        rating=3,
        song_url='https://res.cloudinary.com/matthewsatterwhite/video/upload/v1645635424/Machine_Gun_Kelly_Ft._Iann_Dior_-_nothing_inside_Official_Audio_ksjfxm.mp4'),
    'demons': dict(
        name='Demons',
        artist='Imagine Dragons',
        rating=9,
        song_url='https://res.cloudinary.com/matthewsatterwhite/video/upload/v1645635817/Demons_-_Imagine_Dragons_gc5tcu.mp4'),
    'warriyo': dict(
        name='Warriyo',
        artist='Mortals',
        rating=2,
        song_url='https://res.cloudinary.com/matthewsatterwhite/video/upload/v1645635285/Warriyo_-_Mortals_feat._Laura_Brehm_NCS_Release_yullsu.mp4'),
    'black_parade': dict(
        name='The Black Parade',
        artist='MCR',
        rating=8,
        song_url='https://res.cloudinary.com/matthewsatterwhite/video/upload/v1645636620/Welcome_To_The_Black_Parade_-_My_Chemical_Romance_Lyrics_gpfjlu.mp3'),
    'its_time': dict(
        name="It's Time",
        artist='Imagine Dragons',
        rating=10,
        song_url='https://res.cloudinary.com/matthewsatterwhite/video/upload/v1645637061/Imagine_Dragons_-_It_s_Time_Lyrics_e6bv1b.mp3'),
    'despacito': dict(
        name='Despacito',
        artist='Luis Fonsi',
        rating=2,
        song_url='https://res.cloudinary.com/matthewsatterwhite/video/upload/v1645637555/Luis_Fonsi_Despacito_Lyrics___Lyric_Video_ft._Daddy_Yankee_iea59a.mp3'),
    'holiday': dict(
        name='Holiday',
        artist='Greenday',
        rating=2,
        song_url='https://res.cloudinary.com/matthewsatterwhite/video/upload/v1646537937/Green_Day_-_Holiday_Audio_dmdgnp.mp3',
        song_image='https://i.ytimg.com/vi/l2hA8g1cNvQ/hqdefault.jpg'),
    'happy': dict(
        name='Happy',
        artist='Pharrell Williams',
        rating=2,
        song_url='https://res.cloudinary.com/matthewsatterwhite/video/upload/v1647847521/Pharrell_Williams_-_Happy_HQ__getmp3.pro_snkhpg.mp3'),
    'maybe': dict(
        name='Maybe',
        artist='MGK',
        rating=2,
        song_url='https://res.cloudinary.com/matthewsatterwhite/video/upload/v1647554436/Machine_Gun_Kelly_maybe_ft._Bring_Me_The_Horizon_Official_Visualizer_jrpjyq.mp4'),
}

# moodlist id -> its songs: a key of SONGS, or (key, overrides)
MOODLIST_SONGS = {
    1: ['bored_to_death', 'nothing_inside', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    2: ['demons', 'bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    3: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    4: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe', 'its_time'],
    5: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'despacito', 'holiday', 'happy', 'maybe'],
    6: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    7: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    8: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    9: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    10: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    11: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    12: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    13: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    14: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', ('holiday', {'rating': 10}), 'happy', 'maybe'],
    15: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    16: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
    17: ['bored_to_death', 'nothing_inside', 'demons', 'warriyo', 'black_parade', 'its_time', 'despacito', 'holiday', 'happy', 'maybe'],
}

# New accounts start with these moodlists (name, color)...
STARTER_MOODLISTS = [('Happy', 'green'), ('Sad', 'blue'), ('Bored', 'purple')]

# ...and these songs, as (moodlist name, song)
STARTER_SONGS = [
    ('Happy', SONGS['its_time']),
    ('Happy', SONGS['happy']),
    ('Sad', SONGS['nothing_inside']),
    ('Sad', SONGS['demons']),
    ('Bored', SONGS['black_parade']),
    ('Bored', SONGS['bored_to_death']),
]


def seed_songs(userId=1):
    songs = []
    for moodlistId, entries in MOODLIST_SONGS.items():
        for entry in entries:
            key, overrides = entry if isinstance(entry, tuple) else (entry, {})
            songs.append(Song(
                userId=userId, moodlistId=moodlistId,
                **{**SONGS[key], **overrides}))
    db.session.add_all(songs)
    db.session.commit()


def undo_seeds():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
