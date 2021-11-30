from flask import Blueprint, jsonify, request
from app.models import ReplyLike, db
from app.forms import ReplyLikeForm


reply_like_route = Blueprint('replies_likes', __name__)


@reply_like_route.route('/', methods=['GET'])
def get_likes():
    likes = ReplyLike.query.all()
    return {'likes': [like.to_dict() for like in likes]}

@reply_like_route.route('/', methods=['POST'])
def create_like():
    form = ReplyLikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        like = ReplyLike (
            replyId = form.data['replyId'],
            userId = form.data['userId']
        )
    db.session.add(like)
    db.session.commit()
    return {'like' : like.to_dict()}

@reply_like_route.route('/delete/<int:userId>/<int:replyId>', methods=['DELETE'])
def delete_comment(userId, replyId):
    like = ReplyLike.query.filter(ReplyLike.userId == userId, ReplyLike.replyId == replyId).first()
    db.session.delete(like)
    db.session.commit()
    return { 'id' : like.id }
