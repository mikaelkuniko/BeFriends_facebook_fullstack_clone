from app.models import db, User, Post, Comment
from app.models.join_tables import *
import random

def seed_join_tables():
    users = User.query.all()
    posts = Post.query.all()
    comments = Comment.query.all()

    def randomPost():
        return posts[random.randint(0, len(posts)-1)]
    def randomUser():
        return users[random.randint(0, len(users)-1)]
    def randomComment():
        return comments[random.randint(0, len(comments)-1)]

    # adds a like for each post and comment by a random user
    for user in users:
        post = randomPost()
        comment = randomComment()
        user.user_post_likes.append(post)
        user.user.comment_likes.append(comment)
        db.session.add(user)
        db.session.commit()

def undo_join_tables():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_likes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.comment_likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM post_likes")
        db.session.execute("DELETE FROM comment_likes")

    db.session.commit()
