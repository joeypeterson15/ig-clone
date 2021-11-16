from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',
        avatar="https://i.ibb.co/C5CdyNH/cool-trippy-boy-profile-picture.jpg")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', avatar="https://i.ibb.co/5hJ1kkT/lake-pro-pic-girl.jpg")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', avatar="https://i.ibb.co/f8spgnW/hoodie-guy-pro-pic.jpg")
    brad = User(
        username='winterBrad', email='brad@aa.io', password='password', avatar="https://i.ibb.co/WGBwPLL/motorcycle-pro-pic.jpg")
    andrew = User(
        username='andrewkep', email='andrew@aa.io', password='password', avatar="https://i.ibb.co/Fm3KzQb/party-guy-profilepic.jpg")
    stewart = User(
        username='stew20', email='stewart@aa.io', password='password', avatar="https://i.ibb.co/GJC95Jz/pro-pic-camera.jpg")
    steven = User(
        username='steven10', email='steven@aa.io', password='password', avatar="https://i.ibb.co/ykqMdnZ/Middle-age-man-portrait-at-sunset.jpg" )
    sara = User(
        username='sarahikes', email='sara@aa.io', password='password', avatar="https://i.ibb.co/92yPpWX/pro-pic-hiking-selfy.jpg")
    glen = User(
        username='glennyboy', email='glen@aa.io', password='password', avatar="https://i.ibb.co/GVbF39Q/pro-pic-laugh.jpg")
    robin = User(
        username='robinite111', email='robin@aa.io', password='password', avatar="https://i.ibb.co/QKMqzYb/pro-pic-professional.jpg")
    charles = User(
        username='charlesthe5th', email='charles@aa.io', password='password', avatar="https://i.ibb.co/jJzJj0B/pro-pic-purple-guy.jpg")


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(brad)
    db.session.add(andrew)
    db.session.add(stewart)
    db.session.add(steven)
    db.session.add(sara)
    db.session.add(glen)
    db.session.add(robin)
    db.session.add(charles)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()


# <a href="https://ibb.co/6R9hSVW"><img src="https://i.ibb.co/C5CdyNH/cool-trippy-boy-profile-picture.jpg" alt="cool-trippy-boy-profile-picture" border="0"></a>
# <a href="https://ibb.co/dbR2TLv"><img src="https://i.ibb.co/f8spgnW/hoodie-guy-pro-pic.jpg" alt="hoodie-guy-pro-pic" border="0"></a>
# <a href="https://ibb.co/3mPTvv1"><img src="https://i.ibb.co/5hJ1kkT/lake-pro-pic-girl.jpg" alt="lake-pro-pic-girl" border="0"></a>
# <a href="https://ibb.co/QpYRC44"><img src="https://i.ibb.co/WGBwPLL/motorcycle-pro-pic.jpg" alt="motorcycle-pro-pic" border="0"></a>
# <a href="https://ibb.co/HB4VqcD"><img src="https://i.ibb.co/Fm3KzQb/party-guy-profilepic.jpg" alt="party-guy-profilepic" border="0"></a>
# <a href="https://ibb.co/H2GCH25"><img src="https://i.ibb.co/GJC95Jz/pro-pic-camera.jpg" alt="pro-pic-camera" border="0"></a>
# <a href="https://ibb.co/X5tdjZK"><img src="https://i.ibb.co/ykqMdnZ/Middle-age-man-portrait-at-sunset.jpg" alt="Middle-age-man-portrait-at-sunset" border="0"></a>
# <a href="https://ibb.co/sQs7gqS"><img src="https://i.ibb.co/92yPpWX/pro-pic-hiking-selfy.jpg" alt="pro-pic-hiking-selfy" border="0"></a>
# <a href="https://ibb.co/NLH7nr2"><img src="https://i.ibb.co/GVbF39Q/pro-pic-laugh.jpg" alt="pro-pic-laugh" border="0"></a>
# <a href="https://ibb.co/kSXrkqH"><img src="https://i.ibb.co/QKMqzYb/pro-pic-professional.jpg" alt="pro-pic-professional" border="0"></a>
# <a href="https://ibb.co/vXhXMyg"><img src="https://i.ibb.co/jJzJj0B/pro-pic-purple-guy.jpg" alt="pro-pic-purple-guy" border="0"></a>



# <a href="https://ibb.co/kSy6VQz"><img src="https://i.ibb.co/CHtsph4/pro-pic-stoic.jpg" alt="pro-pic-stoic" border="0"></a>
# <a href="https://ibb.co/17YHs8b"><img src="https://i.ibb.co/7jx7g2b/pro-pic-tieguy.jpg" alt="pro-pic-tieguy" border="0"></a>
# <a href="https://ibb.co/Thckrn6"><img src="https://i.ibb.co/f0M2QKf/silhoeutte-pro-pic-mom.jpg" alt="silhoeutte-pro-pic-mom" border="0"></a>
# <a href="https://ibb.co/7yPxmvK"><img src="https://i.ibb.co/vzpCn1k/Male-face-silhouette-or-icon-Man-avatar-profile-Unknown-or-anonymous-person-Vector-illustration.jpg" alt="Male-face-silhouette-or-icon-Man-avatar-profile-Unknown-or-anonymous-person-Vector-illustration" border="0"></a>
# <a href="https://ibb.co/h1Mj3LX"><img src="https://i.ibb.co/qFnfT70/smiling-glasses-pro-pic.jpg" alt="smiling-glasses-pro-pic" border="0"></a>
# <a href="https://ibb.co/D7mSYzb"><img src="https://i.ibb.co/sFcMCbP/trashbag-profile-pic.jpg" alt="trashbag-profile-pic" border="0"></a>
