from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment
from sqlalchemy import or_
from ..models import db, Comment, User
from ..forms import CommentForm

comment_routes = Blueprint('comment', __name__)

@comment_routes.route('')
@login_required
def all_comments():
    '''
    Queries for all comments in the database
    '''
    comments = Comment.query.all()
    all_comments = []
    for comment in comments:
        all_comments.append(comment.to_dict())
    return {"Comments": all_comments}

@comment_routes.route('/current')
@login_required
def user_comments():
    '''
    Queries for users comments in the database
    '''

    user = current_user.to_dict()

    return {"userComments": [comment for comment in user['comments']]}

@comment_routes.route('/new', methods=['POST'])
@login_required
def new_form():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print('This is form data', form.data)
    if form.validate_on_submit():
        new_comment = Comment()
        form.populate_obj(new_comment)
        new_comment.user_id = current_user.id
        # need to post in current post id
        # print("------------this new comment-------", new_comment)
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400

# update
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment_by_id(id):
    current_comment = Comment.query.get(id)

    if not current_comment:
        return {'errors': "Comment not found"}, 404
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_comment)

        db.session.add(current_comment)
        db.session.commit()
        return current_comment.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400

# DELETE
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_item(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    if not comment:
        return {"errors": "comment not found"}, 404
    return {"message": "comment deleted"}

@comment_routes.route('/<int:id>/commentlike', methods=['POST'])
@login_required
def add_comment_like(id):
    """
    Adds a like to a comment by current user//
    WIP
    """
    current = current_user.to_dict()
    user = User.query.get(current['id'])
    comment = Comment.query.get(id)
    # print('Inside the post like')
    # print("This is the current user", user)
    # print("This is the post ID", post)

    # maybe remove feature for now, ask cory if necessary

    comment.comment_user_likes.append(user)
    db.session.add(user)
    db.session.commit()

    return {"message": "Liked comment"}, 200

@comment_routes.route('/<int:id>/commentlike', methods=['DELETE'])
@login_required
def delete_comment_like(id):
    """
    Delete the like that the User input on the comment

    WIP
    """
    comment = Comment.query.get(id)
    current = current_user.to_dict()
    user = User.query.get(current['id'])

    if len(comment.comment_user_likes):
        for i in range(len(comment.comment_user_likes)):
            if comment.comment_user_likes[i].id == user.id:
                comment.comment_user_likes.pop(i)
                db.session.add(comment)
                db.session.commit()

                return {'message': 'deleted like from comment'}
            
    return {'errors': 'Comment not found'}, 404