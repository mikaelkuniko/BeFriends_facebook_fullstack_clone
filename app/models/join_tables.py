from .db import add_prefix_for_prod, db, environment, SCHEMA
from sqlalchemy.sql import func
# from sqlalchemy.orm import relationship

# post_likes = db.Table(
#     'post_likes',
#     db.Column("user_id", db.ForeignKey(
#         add_prefix_for_prod('users.id')), primary_key=True),
#     db.Column("post_id", db.ForeignKey(
#         add_prefix_for_prod('posts.id')), primary_key=True),
#     db.Column("created_at", db.DateTime(timezone=True), default=func.now())

#     # create a method to query through created join tables
# # def to_dict_post_likes(self):
# # '''
# # Returns a dict representing the post id and user ids that liked
# # return {
# # self.user_id,
# # self.post_id
# # }
# # '''
# )


class Post_Likes(db.Model):
    __tablename__ = 'post_likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)

    
    #  many to many 

    user = db.relationship('User', back_populates='post_likes')

    post = db.relationship('Post', back_populates='post_likes')
    
    def to_dict(self):
        ''' 
        returns a dict representing the likes join table b/w post and user id
        {
        id,
        post_id,
        user_id
        } 
        '''

        return {
        "id": self.id,
        "user": self.user_id,
        "post": self.post_id
        }
    
    def to_get_liked_user(self):
        return self.user_id



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
