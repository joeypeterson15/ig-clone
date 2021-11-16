from app.models import db, Follow

def seed_follows():
    follow1 = Follow(
        userId=1,
        followId=2
    )
    follow2 = Follow(
        userId = 2,
        followId= 1
    )

    db.session.add(follow1)
    db.session.add(follow2)
    db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
