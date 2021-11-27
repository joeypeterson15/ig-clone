
from app.models import db, Hashtag


def seed_hashtags():
    h1 = Hashtag(
        name="travel",
        postId=4
    )
    h2 = Hashtag(
        name="fun",
        postId=2
    )
    h3 = Hashtag(
        name="fun",
        postId=1
    )
    h4 = Hashtag(
        name="fun",
        postId=3
    )
    h5 = Hashtag(
        name="sublime",
        postId=5
    )
    h6 = Hashtag(
        name="travel",
        postId=6
    )
    h7 = Hashtag(
        name="fun",
        postId=7
    )
    h8 = Hashtag(
        name="travel",
        postId=8
    )
    h9 = Hashtag(
        name="sublime",
        postId=9
    )
    h10 = Hashtag(
        name="travel",
        postId=10
    )



    db.session.add(h1)
    db.session.add(h2)
    db.session.add(h3)
    db.session.add(h4)
    db.session.add(h5)
    db.session.add(h6)
    db.session.add(h7)
    db.session.add(h8)
    db.session.add(h9)
    db.session.add(h10)


    db.session.commit()

def undo_hashtags():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
