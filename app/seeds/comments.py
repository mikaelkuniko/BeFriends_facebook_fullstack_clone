from app.models import db, environment, SCHEMA, Comment

def seed_comments():
    demo = Comment(
        user_id = 1,
        post_id = 3,
        comment_text = 'I agree!'
        )
    mikael = Comment(
        user_id = 2,
        post_id = 4,
        comment_text = 'Warzone 2???'
        )
    agnes = Comment(
        user_id = 3,
        post_id = 2,
        comment_text = 'Okay Mr. Poet'
        )
    lily = Comment(
        user_id = 4,
        post_id = 1,
        comment_text = 'Laters!'
        )
    sergio = Comment(
        user_id = 5,
        post_id = 4,
        comment_text = 'Hopping on rn'
        )
    jennie = Comment(
        user_id = 6,
        post_id = 2,
        comment_text = 'I love poetry too!'
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
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
