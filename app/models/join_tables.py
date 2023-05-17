from .db import add_prefix_for_prod, db, environment, SCHEMA
from sqlalchemy.sql import func

post_likes = db.table(
    'post_likes',
    db.Column("user_id", db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("post_id", db.ForeignKey(
        add_prefix_for_prod('posts.id')), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), default=func.now())
)

comment_likes = db.table(
    'comment_likes',
    db.Column("user_id", db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("comment_id", db.ForeignKey(
        add_prefix_for_prod('comments.id')), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), default=func.now())
)

if environment == "production":
    post_likes.schema = SCHEMA
    comment_likes.schema = SCHEMA
