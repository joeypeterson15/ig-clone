from app.models import db, Comment


def seed_comments():
    comment1 = Comment(
        userId = 6,
        postId = 1,
        content = "whoaa!! Awesome",
        username = 'Steph',
        avatar="https://i.ibb.co/sJjZN4n/Galaxy-Woman-on-Cliff-Space.png"
    )

    comment2 = Comment(
        userId = 8,
        postId = 1,
        content = "love it",
        username = 'sarahikes',
        avatar = "https://i.ibb.co/sW70Fmp/Plane-Views.png"
    )
    comment3 = Comment(
        userId = 2,
        postId = 2,
        content = "you rock",
        username = 'marnie',
        avatar = "https://i.ibb.co/XzqDmjB/Roadtrip-Views.png"
    )
    comment4 = Comment(
        userId = 2,
        postId = 1,
        content = "mint!",
        username = 'marnie',
        avatar= "https://i.ibb.co/XzqDmjB/Roadtrip-Views.png"
    )
    comment5 = Comment(
        userId = 3,
        postId = 2,
        content = "bobbie",
        username = 'Demo',
        avatar = "https://i.ibb.co/r0Tcv5c/Retro-Car-on-Beach.png"
    )
    comment6 = Comment(
        userId = 5,
        postId = 5,
        content = "so cool",
        username = 'andrewkep',
        avatar = "https://i.ibb.co/xHx6d5b/Lake-with-Cotton-Candy-Skies.png"
    )
    comment7 = Comment(
        userId = 7,
        postId = 3,
        content = "wow thats crazy",
        username = 'steven10',
        avatar="https://i.ibb.co/DWKt6Nc/Dog-on-Beach.png"
    )
    comment8 = Comment(
        userId = 13,
        postId = 3,
        content = "holyyy",
        username = 'GalaxyJunkie',
        avatar="https://i.ibb.co/p0h9Vrm/Silhouette-with-Space-SBeam-of-Light-Space.png"
    )
    comment9 = Comment(
        userId = 9,
        postId = 2,
        content = "oh my thats soo cool!!",
        username = 'glennyboy',
        avatar = "https://i.ibb.co/541Cc9M/Man-on-top-of-mountain.png"
    )
    comment10 = Comment(
        userId = 10,
        postId = 2,
        content = "oh my thats soo cool!!",
        username = 'gabyms',
        avatar="https://i.ibb.co/Zh0qCTh/Cosmic-Girl-IG-Profile-Pic.png"
    )
    comment11 = Comment(
        userId = 11,
        postId = 3,
        content = "Whoaaa very nice",
        username = 'charlesthe5th',
        avatar="https://i.ibb.co/kGzyNJm/Roadtrip-with-Snowy-Mountain-View.png"
    )
    comment12 = Comment(
        userId = 11,
        postId = 2,
        content = "Where is this?",
        username = 'charlesthe5th',
        avatar="https://i.ibb.co/kGzyNJm/Roadtrip-with-Snowy-Mountain-View.png"
    )
    comment13 = Comment(
        userId = 14,
        postId = 3,
        content = "Look at you!",
        username = 'usnationalparks',
        avatar="https://i.ibb.co/BPDsbCW/Yellowstone.png"
    )
    comment14 = Comment(
        userId = 15,
        postId = 2,
        content = "awesomeee",
        username = 'cosmicgirl',
        avatar="https://i.ibb.co/2PgHQN7/Starry-Night-Sky-Space.png"
    )
    comment15 = Comment(
        userId = 15,
        postId = 4,
        content = "Heck yaaa",
        username = 'cosmicgirl',
        avatar="https://i.ibb.co/2PgHQN7/Starry-Night-Sky-Space.png"
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
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.commit()



def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
