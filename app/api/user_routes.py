from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db, Post, Comment

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/postlike', methods=['DELETE'])
@login_required
def delete_post_like(id):
    """
    Delete the like that the User input on the post
    """
    current = current_user.to_dict()
    user = User.query.get(current['id'])

    if len(user.user_post_likes):
        for i in range(len(user.user_post_likes)):
            if user.user_post_likes[i].id == id:
                user.user_post_likes.pop(i)
                db.session.add(user)
                db.session.commit()

                return {'message': 'deleted like from post'}
            
    return {'errors': 'Post not found'}, 404

@user_routes.route('/<int:id>/commentlike', methods=['DELETE'])
@login_required
def delete_comment_like(id):
    """
    Delete the like that the User input on the comment
    """
    current = current_user.to_dict()
    user = User.query.get(current['id'])

    if len(user.user_post_likes):
        for i in range(len(user.user_comment_likes)):
            if user.user_comment_likes[i].id == id:
                user.user_comment_likes.pop(i)
                db.session.add(user)
                db.session.commit()

                return {'message': 'deleted like from comment'}
            
    return {'errors': 'Comment not found'}, 404

@user_routes.route('/<int:id>/postlike', methods=['POST'])
@login_required
def add_post_like(id):
    """
    Adds a like to a post by current user
    """
    current = current_user.to_dict()
    user = User.query.get(current['id'])
    post = Post.query.get(id)
    # print('Inside the post like')
    print("This is the current user", user)
    print("This is the post ID", post)

    user.user_post_likes.append(post)
    db.session.add(user)
    # print("This is the user posts liked", user.user_post_likes)
    db.session.commit()

    return {"message": "Liked post"}, 200

@user_routes.route('/<int:id>/commentlike', methods=['POST'])
@login_required
def add_comment_like(id):
    """
    Adds a like to a comment by current user
    """
    current = current_user.to_dict()
    user = User.query.get(current['id'])
    comment = Comment.query.get(id)

    user.user_comment_likes.append(comment)
    
    db.session.add(user)
    db.session.commit()

    return {"message": "Liked comment"}, 200

