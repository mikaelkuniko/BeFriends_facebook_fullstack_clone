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



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
