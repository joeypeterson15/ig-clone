from app.models import db, Post


def seed_posts():
    post1 = Post(
        userId=1,
        imageUrl="https://i.ibb.co/HhBtWPm/concert-event-photo.jpg",
        body="Had so much fun",
        avatar="https://i.ibb.co/C5CdyNH/cool-trippy-boy-profile-picture.jpg",
        username='Demo'
    )
    post2 = Post(
        userId=1,
        imageUrl="https://i.ibb.co/4RtZknX/concert-fire-event-post.jpg",
        body="this was the best concert I've ever been to!",
        avatar="https://i.ibb.co/C5CdyNH/cool-trippy-boy-profile-picture.jpg",
        username='Demo'
    )
    post3 = Post(
        userId=3,
        imageUrl="https://i.ibb.co/M5kJKSJ/festival-post.jpg",
        body="me and all my friends",
        avatar="https://i.ibb.co/f8spgnW/hoodie-guy-pro-pic.jpg",
        username="bobbie"
    )
    post4 = Post(
        userId=4,
        imageUrl="https://i.ibb.co/j4gfzbY/forest-walk-post.jpg",
        body="Feeling very relaxed right now",
        avatar="https://i.ibb.co/WGBwPLL/motorcycle-pro-pic.jpg",
        username="winterBrad"
    )
    post5 = Post(
        userId=5,
        imageUrl="https://i.ibb.co/b2GqtC4/galaxy-post.jpg",
        body="How cool is this",
        avatar="https://i.ibb.co/Fm3KzQb/party-guy-profilepic.jpg",
        username="andrewkep"
    )
    post6 = Post(
        userId=2,
        imageUrl="https://i.ibb.co/CwYWXMW/hiking-picture-post.jpg",
        body="Nothing beats this",
        avatar="https://i.ibb.co/5hJ1kkT/lake-pro-pic-girl.jpg",
        username="marnie"
    )
    post7 = Post(
        userId=6,
        imageUrl="https://i.ibb.co/m4YN4Ss/laughing-post.jpg",
        body="Love this guy! I had such a blast last weekend",
        username="stew20",
        avatar="https://i.ibb.co/GJC95Jz/pro-pic-camera.jpg"
    )
    post8 = Post(
        userId=7,
        imageUrl="https://i.ibb.co/kGCnvXc/sitting-rocks-guy-post.jpg",
        body="Can't wait to come back here",
        avatar="https://i.ibb.co/ykqMdnZ/Middle-age-man-portrait-at-sunset.jpg" ,
        username="steven10"
    )
    post9 = Post(
        userId=2,
        imageUrl="https://i.ibb.co/YbdJXrW/spiral-galaxy-post.jpg",
        body="Space!",
        avatar="https://i.ibb.co/5hJ1kkT/lake-pro-pic-girl.jpg",
        username="marnie"
    )
    post10 = Post(
        userId=1,
        imageUrl="https://i.ibb.co/fxsc09W/woman-sitting-rock.jpg",
        body="One of my favorite places to go",
        avatar="https://i.ibb.co/C5CdyNH/cool-trippy-boy-profile-picture.jpg",
        username="Demo"
    )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()





# <a href="https://ibb.co/vXV37d2"><img src="https://i.ibb.co/HhBtWPm/concert-event-photo.jpg" alt="concert-event-photo" border="0"></a>
# <a href="https://ibb.co/N2C6RdJ"><img src="https://i.ibb.co/4RtZknX/concert-fire-event-post.jpg" alt="concert-fire-event-post" border="0"></a>
# <a href="https://ibb.co/JFjS8tS"><img src="https://i.ibb.co/M5kJKSJ/festival-post.jpg" alt="festival-post" border="0"></a>
# <a href="https://ibb.co/6sgw8rS"><img src="https://i.ibb.co/j4gfzbY/forest-walk-post.jpg" alt="forest-walk-post" border="0"></a>
# <a href="https://ibb.co/pRkGqMH"><img src="https://i.ibb.co/b2GqtC4/galaxy-post.jpg" alt="galaxy-post" border="0"></a>
# <a href="https://ibb.co/vcTDrQD"><img src="https://i.ibb.co/CwYWXMW/hiking-picture-post.jpg" alt="hiking-picture-post" border="0"></a>
# <a href="https://ibb.co/BB7nBwD"><img src="https://i.ibb.co/m4YN4Ss/laughing-post.jpg" alt="laughing-post" border="0"></a>
# <a href="https://ibb.co/dPqMNrx"><img src="https://i.ibb.co/T4S2Qkd/nature-stream-post.jpg" alt="nature-stream-post" border="0"></a>
# <a href="https://ibb.co/syFLgYN"><img src="https://i.ibb.co/pJ3C1FM/party-laughing-post.jpg" alt="party-laughing-post" border="0"></a>
# <a href="https://ibb.co/PrHp0gC"><img src="https://i.ibb.co/kGCnvXc/sitting-rocks-guy-post.jpg" alt="sitting-rocks-guy-post" border="0"></a>
# <a href="https://ibb.co/0Q91KwX"><img src="https://i.ibb.co/YbdJXrW/spiral-galaxy-post.jpg" alt="spiral-galaxy-post" border="0"></a>
# <a href="https://ibb.co/vjStzhW"><img src="https://i.ibb.co/fxsc09W/woman-sitting-rock.jpg" alt="woman-sitting-rock" border="0"></a>
