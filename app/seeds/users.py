from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',
        avatar="https://i.ibb.co/grcC8F2/Person-on-Snowy-Mountain.png")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', avatar="https://i.ibb.co/XzqDmjB/Roadtrip-Views.png")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', avatar="https://i.ibb.co/r0Tcv5c/Retro-Car-on-Beach.png")
    brad = User(
        username='winterBrad', email='brad@aa.io', password='password', avatar="https://i.ibb.co/MB1w1yT/Map-Passport-Camera.png")
    andrew = User(
        username='andrewkep', email='andrew@aa.io', password='password', avatar="https://i.ibb.co/xHx6d5b/Lake-with-Cotton-Candy-Skies.png")
    steph = User(
        username='steph', email='stewart@aa.io', password='password', avatar="https://i.ibb.co/sJjZN4n/Galaxy-Woman-on-Cliff-Space.png")
    steven = User(
        username='steven10', email='steven@aa.io', password='password', avatar="https://i.ibb.co/DWKt6Nc/Dog-on-Beach.png" )
    sara = User(
        username='sarahikes', email='sara@aa.io', password='password', avatar="https://i.ibb.co/sW70Fmp/Plane-Views.png")
    glen = User(
        username='glennyboy', email='glen@aa.io', password='password', avatar="https://i.ibb.co/541Cc9M/Man-on-top-of-mountain.png")
    gabyms = User(
        username='gabyms', email='robin@aa.io', password='password', avatar="https://i.ibb.co/r488nBQ/Feet-Hanging-Over-Lake.png")
    charles = User(
        username='charlesthe5th', email='charles@aa.io', password='password', avatar="https://i.ibb.co/kGzyNJm/Roadtrip-with-Snowy-Mountain-View.png")
    foryouAndYours = User (
        username='foryouandyours', email="youyours@aa.io", password='password', avatar="https://i.ibb.co/M5tGBz8/Traveler-Couples-IG-Profile-Pic.png"
    )
    galaxy = User (
        username="GalaxyJunkie", email="galaxy@aa.io", password='password', avatar="https://i.ibb.co/p0h9Vrm/Silhouette-with-Space-SBeam-of-Light-Space.png"
    )

    usnationalparks = User (
        username="usnationalparks", email="parks@aa.io", password='password', avatar="https://i.ibb.co/BPDsbCW/Yellowstone.png"
    )

    cosmicgirl = User (
        username="cosmicgirl", email="cosmic@aa.io", password="password", avatar="https://i.ibb.co/2PgHQN7/Starry-Night-Sky-Space.png"
    )




    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(brad)
    db.session.add(andrew)
    db.session.add(steph)
    db.session.add(steven)
    db.session.add(sara)
    db.session.add(glen)
    db.session.add(gabyms)
    # robin is 10 ^
    db.session.add(charles)
    db.session.add(foryouAndYours)
    db.session.add(galaxy)
    db.session.add(usnationalparks)
    db.session.add(cosmicgirl)

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








# <img src="https://i.ibb.co/XzqDmjB/Roadtrip-Views.png" alt="Roadtrip-Views" border="0">
# <img src="https://i.ibb.co/r0Tcv5c/Retro-Car-on-Beach.png" alt="Retro-Car-on-Beach" border="0">
# <img src="https://i.ibb.co/sW70Fmp/Plane-Views.png" alt="Plane-Views" border="0">
# <img src="https://i.ibb.co/DWKt6Nc/Dog-on-Beach.png" alt="Dog-on-Beach" border="0">



# couples travel
# <img src="https://i.ibb.co/M5tGBz8/Traveler-Couples-IG-Profile-Pic.png" alt="Traveler-Couples-IG-Profile-Pic" border="0">




# <img src="https://i.ibb.co/tqGzxvT/Bryce-Canyon-National-Park.png" alt="Bryce-Canyon-National-Park" border="0">
# <img src="https://i.ibb.co/pvC1Rmh/Woman-in-Car-on-Roadtrip.png" alt="Woman-in-Car-on-Roadtrip" border="0">
# <img src="https://i.ibb.co/GPNDJK0/Woman-in-Car-on-Roadtrip-2.png" alt="Woman-in-Car-on-Roadtrip-2" border="0">
# <img src="https://i.ibb.co/JHfHvxD/Woman-at-Waterfall.png" alt="Woman-at-Waterfall" border="0">
# <img src="https://i.ibb.co/kGzyNJm/Roadtrip-with-Snowy-Mountain-View.png" alt="Roadtrip-with-Snowy-Mountain-View" border="0">
# <img src="https://i.ibb.co/grcC8F2/Person-on-Snowy-Mountain.png" alt="Person-on-Snowy-Mountain" border="0">
# <img src="https://i.ibb.co/R6vqMmW/Man-Standing-in-Beach-Cave.png" alt="Man-Standing-in-Beach-Cave" border="0">
# <img src="https://i.ibb.co/m4P7TZZ/Gondola.png" alt="Gondola" border="0">
# <img src="https://i.ibb.co/xHx6d5b/Lake-with-Cotton-Candy-Skies.png" alt="Lake-with-Cotton-Candy-Skies" border="0">
# <img src="https://i.ibb.co/2PgHQN7/Starry-Night-Sky-Space.png" alt="Starry-Night-Sky-Space" border="0">
# <img src="https://i.ibb.co/p0h9Vrm/Silhouette-with-Space-SBeam-of-Light-Space.png" alt="Silhouette-with-Space-SBeam-of-Light-Space" border="0">
# <img src="https://i.ibb.co/xgG73ZX/Planet-Earth-Space.png" alt="Planet-Earth-Space" border="0">
# <img src="https://i.ibb.co/sJjZN4n/Galaxy-Woman-on-Cliff-Space.png" alt="Galaxy-Woman-on-Cliff-Space" border="0">
# <img src="https://i.ibb.co/P92zR1y/Astronaut-Space.png" alt="Astronaut-Space" border="0">
# <img src="https://i.ibb.co/Qc9vsWk/Silhouette-Hikers.png" alt="Silhouette-Hikers" border="0">
# <img src="https://i.ibb.co/nBYPDbg/Plane-Views-2.png" alt="Plane-Views-2" border="0">
# <img src="https://i.ibb.co/XLKR6dQ/Open-Road-Sunset.png" alt="Open-Road-Sunset" border="0">
# <img src="https://i.ibb.co/MB1w1yT/Map-Passport-Camera.png" alt="Map-Passport-Camera" border="0">
# <img src="https://i.ibb.co/541Cc9M/Man-on-top-of-mountain.png" alt="Man-on-top-of-mountain" border="0">
# <img src="https://i.ibb.co/jRyzgVW/Man-on-Beach-at-Sunset.png" alt="Man-on-Beach-at-Sunset" border="0">
# <img src="https://i.ibb.co/Fbcxxqz/Man-at-Train-Tracks.png" alt="Man-at-Train-Tracks" border="0">
# <img src="https://i.ibb.co/r488nBQ/Feet-Hanging-Over-Lake.png" alt="Feet-Hanging-Over-Lake" border="0">
