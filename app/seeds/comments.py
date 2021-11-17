from app.models import db, Comment


def seed_comments():
    comment1 = Comment(
        userId = 1,
        postId = 1,
        content = "whoaa!! Awesome"
    )

    comment2 = Comment(
        userId = 1,
        postId = 1,
        content = "love it"
    )
    comment3 = Comment(
        userId = 2,
        postId = 2,
        content = "you rock"
    )
    comment4 = Comment(
        userId = 3,
        postId = 1,
        content = "mint!"
    )
    comment5 = Comment(
        userId = 1,
        postId = 2,
        content = "bruvvv"
    )
    comment6 = Comment(
        userId = 1,
        postId = 3,
        content = "so cool"
    )
    comment7 = Comment(
        userId = 1,
        postId = 3,
        content = "wow thats crazy"
    )
    comment8 = Comment(
        userId = 1,
        postId = 3,
        content = "holyyy"
    )
    comment9 = Comment(
        userId = 1,
        postId = 2,
        content = "oh my thats soo cool!!"
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.commit()



def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
