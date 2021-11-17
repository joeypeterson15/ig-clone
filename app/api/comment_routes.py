from flask import Blueprint, jsonify, request
from app.models import Comment, db
from app.forms import addCommentForm


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>')
def get_my_comments(id):
    comments = Comment.query.filter(Comment.postId == id)
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/', methods=['POST'])
def create_comment():
    print('made it to back end!!!!')
    form = addCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment (
            content = form.data['content'],
            postId = form.data['postId'],
            userId = form.data['userId']
        )
    print(comment)
    db.session.add(comment)
    db.session.commit()
    return {'comment' : comment.to_dict()}

@comment_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_comment(id):
    print('hellooooo!!!!!')
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return { 'commentId' : id }
