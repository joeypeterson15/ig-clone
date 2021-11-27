from flask import Blueprint, jsonify, request
from app.models import CommentLike, db
from app.forms import addCommentLikeForm


comment_likes_routes = Blueprint('comment_likes', __name__)


@comment_likes_routes.route('/<int:id>')
def get_likes(id):
    likes = CommentLike.query.all()
    return {'likes': [like.to_dict() for like in likes]}

@comment_likes_routes.route('/', methods=['POST'])
def create_like():
    form = addCommentLikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        like = CommentLike (
            commentId = form.data['commentId'],
            userId = form.data['userId']
        )
    db.session.add(like)
    db.session.commit()
    return {'like' : like.to_dict()}

@comment_likes_routes.route('/delete/<int:userId>/<int:commentId>', methods=['DELETE'])
def delete_comment(userId, commentId):
    like = CommentLike.query.filter(CommentLike.userId == userId, CommentLike.commentId == commentId).first()
    db.session.delete(like)
    db.session.commit()
    return { 'id' : like.id }
