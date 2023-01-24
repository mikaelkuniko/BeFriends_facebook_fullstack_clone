from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    post_text = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    user = db.relationship('User', back_populates='posts')

    def to_dict(self):
        """
        Returns a dict representing Posts
        {
            id,
            user,
            post,
            created_at,
            updated_at,
        }
        """
        return {
            "id": self.id,
            "user": self.user.to_dict_info(),
            "post": self.post_text,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
