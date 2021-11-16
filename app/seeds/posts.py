from app.models import db, Post


def seed_posts():
    post1 = Post(
        userId=1,
        imageUrl="https://i.ibb.co/HhBtWPm/concert-event-photo.jpg",
        body="Had so much fun"
    )
    post2 = Post(
        userId=2,
        imageUrl="https://i.ibb.co/4RtZknX/concert-fire-event-post.jpg",
        body="this was the best concert I've ever been to!"
    )
    post3 = Post(
        userId=1,
        imageUrl="https://i.ibb.co/M5kJKSJ/festival-post.jpg",
        body="me and all my friends"
    )
    post4 = Post(
        userId=2,
        imageUrl="https://i.ibb.co/j4gfzbY/forest-walk-post.jpg",
        body="Feeling very relaxed right now"
    )
    post5 = Post(
        userId=3,
        imageUrl="https://i.ibb.co/b2GqtC4/galaxy-post.jpg",
        body="How cool is this"
    )
    post6 = Post(
        userId=2,
        imageUrl="https://i.ibb.co/CwYWXMW/hiking-picture-post.jpg",
        body="Nothing beats this"
    )
    post7 = Post(
        userId=1,
        imageUrl="https://i.ibb.co/m4YN4Ss/laughing-post.jpg",
        body="Love this guy! I had such a blast last weekend"
    )
    post8 = Post(
        userId=1,
        imageUrl="https://i.ibb.co/kGCnvXc/sitting-rocks-guy-post.jpg",
        body="Can't wait to come back here"
    )
    post9 = Post(
        userId=2,
        imageUrl="https://i.ibb.co/YbdJXrW/spiral-galaxy-post.jpg",
        body="Space!"
    )
    post10 = Post(
        userId=1,
        imageUrl="https://i.ibb.co/fxsc09W/woman-sitting-rock.jpg",
        body="One of my favorite places to go"
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
