from .db import add_prefix_for_prod, db, environment, SCHEMA
from sqlalchemy.sql import func

post_likes = db.Table(
    'post_likes',
    db.Column("user_id", db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("post_id", db.ForeignKey(
        add_prefix_for_prod('posts.id')), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), default=func.now())

    # create a method to query through created join tables
# def to_dict_post_likes(self):
# '''
# Returns a dict representing the post id and user ids that liked
# return {
# self.user_id,
# self.post_id
# }
# '''
)

comment_likes = db.Table(
    'comment_likes',
    db.Column("user_id", db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("comment_id", db.ForeignKey(
        add_prefix_for_prod('comments.id')), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), default=func.now())

# def to_dict_comment_likes(self):
# '''
# Returns a dict representing the post id and user ids that liked
# return {
# self.user_id,
# self.comment_id
# }
# '''
)


if environment == "production":
    post_likes.schema = SCHEMA
    comment_likes.schema = SCHEMA
