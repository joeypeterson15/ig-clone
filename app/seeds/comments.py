from app.models import db, Comment


def seed_comments():
    comment1 = Comment(
        userId = 1,
        postId = 1,
        content = "whoaa!! Awesome",
        username = 'Demo',
        avatar = "https://i.ibb.co/C5CdyNH/cool-trippy-boy-profile-picture.jpg"
    )

    comment2 = Comment(
        userId = 1,
        postId = 1,
        content = "love it",
        username = 'Demo',
        avatar = "https://i.ibb.co/C5CdyNH/cool-trippy-boy-profile-picture.jpg"
    )
    comment3 = Comment(
        userId = 2,
        postId = 2,
        content = "you rock",
        username = 'marnie',
        avatar = "https://i.ibb.co/5hJ1kkT/lake-pro-pic-girl.jpg"
    )
    comment4 = Comment(
        userId = 2,
        postId = 1,
        content = "mint!",
        username = 'marnie',
        avatar= "https://i.ibb.co/5hJ1kkT/lake-pro-pic-girl.jpg"
    )
    comment5 = Comment(
        userId = 1,
        postId = 2,
        content = "bruvvv",
        username = 'Demo',
        avatar = "https://i.ibb.co/C5CdyNH/cool-trippy-boy-profile-picture.jpg"
    )
    comment6 = Comment(
        userId = 1,
        postId = 3,
        content = "so cool",
        username = 'Demo',
        avatar = "https://i.ibb.co/C5CdyNH/cool-trippy-boy-profile-picture.jpg"
    )
    comment7 = Comment(
        userId = 1,
        postId = 3,
        content = "wow thats crazy",
        username = 'Demo',
        avatar = "https://i.ibb.co/C5CdyNH/cool-trippy-boy-profile-picture.jpg"
    )
    comment8 = Comment(
        userId = 1,
        postId = 3,
        content = "holyyy",
        username = 'Demo',
        avatar = "https://i.ibb.co/C5CdyNH/cool-trippy-boy-profile-picture.jpg"
    )
    comment9 = Comment(
        userId = 2,
        postId = 2,
        content = "oh my thats soo cool!!",
        username = 'marnie',
        avatar = "https://i.ibb.co/5hJ1kkT/lake-pro-pic-girl.jpg"
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
