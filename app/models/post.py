from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
# from sqlalchemy.orm import relationship
# from .join_tables import post_likes

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    post_text = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    # Many to one relationships

    user = db.relationship('User', back_populates='post')

    # One to many

    comment = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')

    # One to many

    # post_user_likes = db.relationship("User",
    #                             secondary=post_likes,
    #                             back_populates='user_post_likes')
    
    '''
    # revised with joins table recreated as a model (1/3/2024)
    
    '''

    post_likes = db.relationship('Post_Likes', back_populates='post')

    def to_dict(self):
        """
        Returns a dict representing Posts
        {
            id,
            user,
            post,
            comments,
            created_at,
            updated_at,
            post_user_like
        }
        method returns object for future use
        """
        return {
            "id": self.id,
            "user": self.user.to_dict_info(),
            "post": self.post_text,
            # 'comments': [comment.to_dict() for comment in self.comment],
            "created_at": self.created_at,
            "updated_at": self.updated_at,

            "post_likes": [post_like.to_dict() for post_like in self.post_likes],
            "user_likes": [likes.to_get_liked_user() for likes in self.post_likes]
            # "post_user_like": len(self.post_user_likes),

            # some kind of breaking bug with self.post-user_likes
            # take user ids and grab user names to diplay
            # "user_id_likes": (self.post_user_likes)
            # array test for user id
            # "user_id_for_likes": [self.post_user_likes for post_user in self.post]
            # create method in post_like to return obj that contains all user id and liked posts
        }

    def to_dict_no_user(self):
        '''
        Returns a dict representing Posts
        {
            id,
            user,
            post,
            created_at,
            updated_at,
           
        }
        '''
        return{
            "id": self.id,
            "post": self.post_text,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
