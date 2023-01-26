from app.models import db, environment, SCHEMA, Post

# Adds a demo user, you can add other users here if you want
def seed_posts():
    demo = Post(
        user_id = 1,
        post_text = 'Hello there!'
        )
    mikael = Post(
        user_id = 2,
        post_text = 'There is a bitter triumph in crashing when you should be soaring'
        )
    agnes = Post(
        user_id = 3,
        post_text = 'The new insta feed is horrible!'
        )
    lily = Post(
        user_id = 4,
        post_text = 'Im streaming on twitch soon!'
        )
    sergio = Post(
        user_id = 5,
        post_text = 'Lakers need to step it up'
        )
    jennie = Post(
        user_id = 6,
        post_text = 'Listen to my song, Solo!!'
        )

    db.session.add(demo)
    db.session.add(mikael)
    db.session.add(agnes)
    db.session.add(lily)
    db.session.add(sergio)
    db.session.add(jennie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
