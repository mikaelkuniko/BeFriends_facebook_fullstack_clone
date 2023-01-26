from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(1000), nullable=False)
    last_name = db.Column(db.String(1000), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255))
    birthday = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    # USER CLASS RELATIONSHIPS
    # One to many: User has many posts through owner_id
    post = db.relationship('Post', back_populates='user', cascade='all, delete-orphan')

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
            gender
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
            'post': [post.to_dict() for post in self.post]
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
            'username': self.username,
            'email': self.email,
            "profile_pic": self.profile_pic,
            'birthday': self.birthday,
            'gender': self.gender
        }
