from app.models import db, Like


def seed_likes():
    post1 = Like(
        userId=1,
        postId=1,
        username='Demo'
    )
    post2 = Like(
        userId=1,
        postId=2,
        username='Demo'
    )
    post3 = Like(
        userId=1,
        postId=4,
        username='Demo'
    )
    post4 = Like(
        userId=1,
        postId=3,
        username='Demo'
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)


    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
