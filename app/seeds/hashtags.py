
from app.models import db, Hashtag


def seed_hashtags():
    h1 = Hashtag(
        name="sublime",
        postId=1
    )
    h2 = Hashtag(
        name="travel",
        postId=2
    )
    h3 = Hashtag(
        name="fun",
        postId=1
    )



    db.session.add(h1)
    db.session.add(h2)
    db.session.add(h3)


    db.session.commit()

def undo_hashtags():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
