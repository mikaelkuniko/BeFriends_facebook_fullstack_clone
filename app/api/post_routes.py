from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post
from sqlalchemy import or_
from ..models import db, Post, User, Post_Like
from ..forms import PostForm

post_routes = Blueprint('post', __name__)

@post_routes.route('')
@login_required
def all_posts():
    '''
    Queries for all posts in the database
    '''
    posts = Post.query.all()
    all_posts = []
    for post in posts:
        all_posts.append(post.to_dict())
    return {"Posts": all_posts}

@post_routes.route('/current')
@login_required
def user_posts():
    '''
    Queries for users posts in the database
    '''

    user = current_user.to_dict()

    return {"userPosts": [post for post in user['posts']]}

@post_routes.route('/new', methods=['POST'])
@login_required
def new_form():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print('This is form data', form.data)
    if form.validate_on_submit():
        new_post = Post()
        form.populate_obj(new_post)
        new_post.user_id = current_user.id
        # print("------------this new post-------", new_post)
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400

# update
@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_post_by_id(id):
    current_post = Post.query.get(id)

    if not current_post:
        return {'errors': "Post not found"}, 404
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_post)

        db.session.add(current_post)
        db.session.commit()
        return current_post.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400

# DELETE
@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_item(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    if not post:
        return {"errors": "Post not found"}, 404
    return {"message": "Post deleted"}

# ADD A LIKE to post
@post_routes.route('/<int:id>/postlike', methods=['POST'])
@login_required
def add_post_like(id):
    '''
    Adds a like to the post by current user id

    need to add validator if user has already liked the post
    '''
    current = current_user.to_dict()
    user = User.query.get(current['id'])

    check_like = Post_Like.query.filter_by(user_id=user.id, post_id=id).first()


    if check_like:
        return {"errors": 'User has already liked the post'}, 400
    else:
        new_like = Post_Like()
        # print("this is the user", user)
        new_like.user_id = user.id
        new_like.post_id = id
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict(), 201


    
# DELETE A LIKE to the post
@post_routes.route('/<int:id>/postlike', methods=['DELETE'])
@login_required
def delete_post_like(id):
    '''
    Deletes a like from the post
    '''
    current = current_user.to_dict()
    user = User.query.get(current['id'])

    # if the current user id has liked the post delete the like
    post_like = Post_Like.query.filter(Post_Like.user_id == user.id, Post_Like.post_id == id).first()
    # print("this is the current user id", user.id)
    # print("this is the current post id", id)
    # print("This is if user has liked the post", post_like)
    if post_like:
        db.session.delete(post_like)
        db.session.commit()
        return {"message":"Like deleted"}
    else:
        return {"errors": "Like not found"}, 404






# Add a like to a post commented out 1/4/2024
# @post_routes.route('/<int:id>/postlike', methods=['POST'])
# @login_required
# def add_post_like(id):
#     """
#     Adds a like to a post by current user/
#     """
#     current = current_user.to_dict()
#     user = User.query.get(current['id'])
#     post = Post.query.get(id)
#     # print('Inside the post like')
#     # print("This is the current user", user)
#     # print("This is the post ID", post)

#     # creates a like immediately; however, needs to refresh to show changes

#     post.post_user_likes.append(user)
#     db.session.add(user)
#     # print("This is the posts user likes", post)
#     db.session.commit()

#     return {"message": "Liked post"}, 200

# @post_routes.route('/<int:id>/postlike', methods=['DELETE'])
# @login_required
# def delete_post_like(id):
#     """
#     Delete the like that the User input on the post
#     """
#     post = Post.query.get(id)
#     current = current_user.to_dict()
#     user = User.query.get(current['id'])

#     # print('--------------------------------------------------------This is the post likes---------------------------------------------------', post.post_user_likes)
#     # print("----------------------This is user", user)
#     # print("This is list of users that liked the post", post.post_user_likes)

#     if len(post.post_user_likes):
#         for i in range(len(post.post_user_likes)):
#             if post.post_user_likes[i].id == user.id:
#                 post.post_user_likes.pop(i)
#                 db.session.add(post)
#                 db.session.commit()

#                 return {'message': 'deleted like from post'}
            
#     return {'errors': 'Post not found'}, 404