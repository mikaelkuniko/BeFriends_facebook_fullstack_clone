from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .join_tables import post_likes, comment_likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # create aws for profile pics
    # models for aws pictures and profiles for aws
    #  create aws links

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(1000), nullable=False)
    last_name = db.Column(db.String(1000), nullable=False)
    username = db.Column(db.String(40))
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255))
    birthday = db.Column(db.String(255))
    gender = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    # USER CLASS RELATIONSHIPS
    # One to many: User has many posts through user_id
    post = db.relationship('Post', back_populates='user', cascade='all, delete-orphan')

    comment = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')

    # Many to many: User has many liked posts through post_likes and many liked comments through comment_likes
    user_post_likes = db.relationship("Post",
                                      secondary=post_likes,
                                    #   primaryjoin="User.id == post_likes.c.user_id",
                                    #   secondaryjoin="Post.id == post_likes.c.post_id",
                                      back_populates="post_user_likes")
    
    user_comment_likes = db.relationship("Comment",
                                secondary=comment_likes,
                                # primaryjoin="User.id == comment_likes.c.user_id",
                                # secondaryjoin="Comment.id == comment_likes.c.comment_id",
                                back_populates='comment_user_likes')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        '''
        Returns a dict representing User
        {
            id,
            first_name,
            last_name
            username,
            email,
            profile_pic,
            birthday,
            gender,
            posts,
            comments
        }
        '''
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'birthday': self.birthday,
            'gender': self.gender,
            'posts': [post.to_dict() for post in self.post],
            # 'comments': [comment.to_dict() for comment in self.comment]
        }

    def to_dict_info(self):
        '''
        Returns a dict representing User
        {
            id,
            username,
            email,
            profile_pic,
            birthday,
            gender
        }
        '''
        return {
            'id': self.id,
            # 'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            "profile_pic": self.profile_pic,
            'birthday': self.birthday,
            'gender': self.gender
        }
