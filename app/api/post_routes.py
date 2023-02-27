from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post
from sqlalchemy import or_
from ..models import db, Post, User
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

# CREATE like
@post_routes.route('/<int:id>/like', methods=['POST'])
@login_required
def add_post_like(id):
    current = current_user.to_dict()
    user = User.query.get(current['id'])
    post = Post.query.get(id)

    user.user_post_likes.append(post)
    db.session.add(user)
    db.session.commit()

    return {"message": "Post added"}, 200

# DELETE like
@post_routes.route('/<int:id>/like', methods=['DELETE'])
@login_required
def delete_post_like(id):
    current = current_user.to_dict()
    user = User.query.get(current['id'])

    if len(user.user_post_likes):
        for i in range(len(user.user_post_likes)):
            if user.user_post_likes[i].id == id:
                user.user_post_likes.pop(i)

                db.session.add(user)
                db.session.commit()

                return {'message': 'deleted liked post'}

    # print(user.user_post_likes[0])
    return {"errors": "Post not found"}, 404
