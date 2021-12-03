from app.models import db, Post


def seed_posts():
    post1 = Post(
        userId=1,
        imageUrl="https://i.ibb.co/w73yC8j/Golden-Retriever-in-Canoe.png",
        body="another one #fun",
        avatar="https://i.ibb.co/grcC8F2/Person-on-Snowy-Mountain.png",
        username='Demo',
        # hashtagId=3
    )
    post2 = Post(
        userId=1,
        imageUrl="https://i.ibb.co/4RtZknX/concert-fire-event-post.jpg",
        body="I had such a blast! #fun",
        avatar="https://i.ibb.co/grcC8F2/Person-on-Snowy-Mountain.png",
        username='Demo',
        # hashtagId=3
    )
    post3 = Post(
        userId=3,
        imageUrl="https://i.ibb.co/XLKR6dQ/Open-Road-Sunset.png",
        body="me and all my friends #fun",
        avatar="https://i.ibb.co/r0Tcv5c/Retro-Car-on-Beach.png",
        username="bobbie",
        # hashtagId=3
    )
    post4 = Post(
        userId=4,
        imageUrl="https://i.ibb.co/j4gfzbY/forest-walk-post.jpg",
        body="Feeling very relaxed right now #travel",
        avatar="https://i.ibb.co/MB1w1yT/Map-Passport-Camera.png",
        username="winterBrad",
        # hashtagId=2
    )
    post5 = Post(
        userId=5,
        imageUrl="https://i.ibb.co/b2GqtC4/galaxy-post.jpg",
        body="How cool is this #sublime",
        avatar="https://i.ibb.co/xHx6d5b/Lake-with-Cotton-Candy-Skies.png",
        username="andrewkep",
        # hashtagId=1
    )
    post6 = Post(
        userId=2,
        imageUrl="https://i.ibb.co/GPNDJK0/Woman-in-Car-on-Roadtrip-2.png",
        body="Nothing beats this #travel",
        avatar="https://i.ibb.co/XzqDmjB/Roadtrip-Views.png",
        username="marnie",
        # hashtagId=2
    )
    post7 = Post(
        userId=6,
        imageUrl="https://i.ibb.co/R6vqMmW/Man-Standing-in-Beach-Cave.png",
        body="Had a lot of fun here last weekend #fun",
        username="steph",
        avatar="https://i.ibb.co/sJjZN4n/Galaxy-Woman-on-Cliff-Space.png"
    )
    post8 = Post(
        userId=7,
        imageUrl="https://i.ibb.co/kGCnvXc/sitting-rocks-guy-post.jpg",
        body="Can't wait to come back #travel",
        avatar="https://i.ibb.co/DWKt6Nc/Dog-on-Beach.png" ,
        username="steven10",
    )
    post9 = Post(
        userId=2,
        imageUrl="https://i.ibb.co/YbdJXrW/spiral-galaxy-post.jpg",
        body="whoa #sublime",
        avatar="https://i.ibb.co/XzqDmjB/Roadtrip-Views.png",
        username="marnie",
    )
    post10 = Post(
        userId=10,
        imageUrl="https://i.ibb.co/KbnMd6p/Girl-Hiking-in-Whistler-stefgoes.png",
        body="One of my favorite places to go #travel",
        avatar="https://i.ibb.co/r488nBQ/Feet-Hanging-Over-Lake.png",
        username="gabyms",
    )
    post23 = Post(
        userId=10,
        imageUrl="https://i.ibb.co/r488nBQ/Feet-Hanging-Over-Lake.png",
        body="Just hangin'",
        avatar="https://i.ibb.co/Zh0qCTh/Cosmic-Girl-IG-Profile-Pic.png",
        username="gabyms"
    )




#  couples page 12

    # post11 = Post(
    #     userId=12,
    #     imageUrl="https://i.ibb.co/V9TFVyG/Couple-in-Rice-Field-foryouandyours.png",
    #     body="Getting lost in a rice field in Bali is the ultimate test. How would you and yours fare?",
    #     avatar="https://i.ibb.co/M5tGBz8/Traveler-Couples-IG-Profile-Pic.png",
    #     username="foryouandyours"
    # )
    # post12 = Post(
    #     userId=12,
    #     imageUrl="https://i.ibb.co/r5SMZMh/Couple-Looking-Out-Over-Rio-foryouandyours.png",
    #     body="On top of the world",
    #     avatar="https://i.ibb.co/M5tGBz8/Traveler-Couples-IG-Profile-Pic.png",
    #     username="foryouandyours"
    # )
    # post13 = Post(
    #     userId=12,
    #     imageUrl="https://i.ibb.co/BVW5gHF/Couple-in-Hammock-at-Sunset-foryouandyours.png",
    #     body="Peace of mind and heart",
    #     avatar="https://i.ibb.co/M5tGBz8/Traveler-Couples-IG-Profile-Pic.png",
    #     username="foryouandyours"
    # )
    # post14 = Post(
    #     userId=12,
    #     imageUrl="https://i.ibb.co/sRzhKw1/Couple-Holding-Hands-in-India-foryouandyours.png",
    #     body="Live your dreams together",
    #     avatar="https://i.ibb.co/M5tGBz8/Traveler-Couples-IG-Profile-Pic.png",
    #     username="foryouandyours"
    # )
    # post15 = Post(
    #     userId=12,
    #     imageUrl="https://i.ibb.co/9pbrXjh/Couple-Enjoying-the-View-foryouandyours.png",
    #     body="Partners that climb mountains with you",
    #     avatar="https://i.ibb.co/M5tGBz8/Traveler-Couples-IG-Profile-Pic.png",
    #     username="foryouandyours"
    # )


    # galaxy 13

    post16 = Post(
        userId=13,
        imageUrl="https://i.ibb.co/4PXS9nC/Finland-Geomagnetic-Storm-Galaxy-Junkie.png",
        body="Standing in the eye of the storm. Photograph from the geomagnetic storm in Northern Finland",
        avatar="https://i.ibb.co/p0h9Vrm/Silhouette-with-Space-SBeam-of-Light-Space.png",
        username="GalaxyJunkie"
    )
    post17 = Post(
        userId=13,
        imageUrl="https://i.ibb.co/Xbr9vnB/Northern-Norway-Nightsky-Galaxy-Junkie.png",
        body="About last night’s show…",
        avatar="https://i.ibb.co/p0h9Vrm/Silhouette-with-Space-SBeam-of-Light-Space.png",
        username="GalaxyJunkie"
    )
    post18 = Post(
        userId=13,
        imageUrl="https://i.ibb.co/s6WkcLp/Between-Finland-and-Sweden-Galaxyjunkie.png",
        body="Casually standing between Finland and Sweden. Does that mean I’m in Finden?",
        avatar="https://i.ibb.co/p0h9Vrm/Silhouette-with-Space-SBeam-of-Light-Space.png",
        username="GalaxyJunkie"
    )




    post19 = Post(
        userId=14,
        imageUrl="https://i.ibb.co/59Y1FH5/Zion.png",
        body="Weaving thru canyon trails & soaking up the otherworldly sights",
        avatar="https://i.ibb.co/BPDsbCW/Yellowstone.png",
        username="usnationalparks"
    )
    post20 = Post(
        userId=14,
        imageUrl="https://i.ibb.co/kB6vkH0/Badlands.png",
        body="Fresh air, don’t care",
        avatar="https://i.ibb.co/BPDsbCW/Yellowstone.png",
        username="usnationalparks"
    )
    post21 = Post(
        userId=14,
        imageUrl="https://i.ibb.co/3vmZzYq/Yosemite.png",
        body="“It is easier to feel than to realize, or in any way explain, Yosemite grandeur…” ",
        avatar="https://i.ibb.co/BPDsbCW/Yellowstone.png",
        username="usnationalparks"
    )

    post22 = Post(
        userId=1,
        imageUrl="https://i.ibb.co/m4P7TZZ/Gondola.png",
        body="Can't believe I'm doing this right now!",
        avatar="https://i.ibb.co/grcC8F2/Person-on-Snowy-Mountain.png",
        username='Demo',
        # hashtagId=3
    )

    # <img src="https://i.ibb.co/m4P7TZZ/Gondola.png" alt="Gondola" border="0">





    # post22 = Post(
    #     userId=
    #     imageUrl=
    #     body=
    #     avatar=
    #     username=
    # )
    # post23 = Post(
    #     userId=
    #     imageUrl=
    #     body=
    #     avatar=
    #     username=
    # )
    # post24 = Post(
    #     userId=
    #     imageUrl=
    #     body=
    #     avatar=
    #     username=
    # )
    # post25 = Post(
    #     userId=
    #     imageUrl=
    #     body=
    #     avatar=
    #     username=
    # )

#     <img src="https://i.ibb.co/59Y1FH5/Zion.png" alt="Zion" border="0">
# <img src="https://i.ibb.co/3vmZzYq/Yosemite.png" alt="Yosemite" border="0">
# <img src="https://i.ibb.co/kB6vkH0/Badlands.png" alt="Badlands" border="0">
# <img src="https://i.ibb.co/BPDsbCW/Yellowstone.png" alt="Yellowstone" border="0">







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
    db.session.add(post16)
    db.session.add(post17)
    db.session.add(post18)
    db.session.add(post19)
    db.session.add(post20)
    db.session.add(post21)
    db.session.add(post22)
    db.session.add(post23)

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

# <a href="https://ibb.co/KjC5L1K"><img src="https://i.ibb.co/pvC1Rmh/Woman-in-Car-on-Roadtrip.png" alt="Woman-in-Car-on-Roadtrip" border="0"></a>
# <a href="https://ibb.co/f0LWSh2"><img src="https://i.ibb.co/GPNDJK0/Woman-in-Car-on-Roadtrip-2.png" alt="Woman-in-Car-on-Roadtrip-2" border="0"></a>
# <a href="https://ibb.co/KWMW2NT"><img src="https://i.ibb.co/JHfHvxD/Woman-at-Waterfall.png" alt="Woman-at-Waterfall" border="0"></a>
# <a href="https://ibb.co/0n1XHKs"><img src="https://i.ibb.co/kGzyNJm/Roadtrip-with-Snowy-Mountain-View.png" alt="Roadtrip-with-Snowy-Mountain-View" border="0"></a>
# <a href="https://ibb.co/qRvCb7G"><img src="https://i.ibb.co/XzqDmjB/Roadtrip-Views.png" alt="Roadtrip-Views" border="0"></a>
# <a href="https://ibb.co/9pdj03D"><img src="https://i.ibb.co/grcC8F2/Person-on-Snowy-Mountain.png" alt="Person-on-Snowy-Mountain" border="0"></a>
# <a href="https://ibb.co/hd7Snjv"><img src="https://i.ibb.co/R6vqMmW/Man-Standing-in-Beach-Cave.png" alt="Man-Standing-in-Beach-Cave" border="0"></a>
# <a href="https://ibb.co/fHT7F66"><img src="https://i.ibb.co/m4P7TZZ/Gondola.png" alt="Gondola" border="0"></a>
# <a href="https://ibb.co/ws54j6q"><img src="https://i.ibb.co/xHx6d5b/Lake-with-Cotton-Candy-Skies.png" alt="Lake-with-Cotton-Candy-Skies" border="0"></a>
# <a href="https://ibb.co/S0RG8rX"><img src="https://i.ibb.co/2PgHQN7/Starry-Night-Sky-Space.png" alt="Starry-Night-Sky-Space" border="0"></a>

# <img src="https://i.ibb.co/KbnMd6p/Girl-Hiking-in-Whistler-stefgoes.png" alt="Girl-Hiking-in-Whistler-stefgoes" border="0">
