from app.models import db, Follow

def seed_follows():
    follow1 = Follow(
        userId=1,
        followId=2
    )
    follow2 = Follow(
        userId = 1,
        followId= 3
    )
    follow3 = Follow(
        userId = 1,
        followId= 4
    )
    follow4 = Follow(
        userId = 1,
        followId= 5
    )

    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.add(follow4)
    db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
