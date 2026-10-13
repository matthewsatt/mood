from app.models import db, Moodlist


# (name, color), seeded for the demo user in this order
MOODLISTS = [
    ('Uplifting', 'red'),
    ('Happy', 'green'),
    ('Sad', 'blue'),
    ('Bored', 'purple'),
    ('Dramatic', 'black'),
    ('Relaxed', 'red'),
    ('Nostalgic', 'green'),
    ('Melodic', 'blue'),
    ('Meditative', 'purple'),
    ('Gloomy', 'black'),
    ('Driving', 'brown'),
    ('Gentle', 'red'),
    ('Epic', 'green'),
    ('Scary', 'blue'),
    ('Annoyed', 'purple'),
    ('Gloomy', 'black'),
    ('Sleepy', 'brown'),
]


def seed_moodlist(userId=1):
    db.session.add_all(
        Moodlist(name=name, color=color, userId=userId)
        for name, color in MOODLISTS)
    db.session.commit()


def undo_moodlists():
    db.session.execute('TRUNCATE moodlists RESTART IDENTITY CASCADE;')
    db.session.commit()
