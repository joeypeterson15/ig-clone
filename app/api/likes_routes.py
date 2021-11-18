from flask import Blueprint, jsonify, request
from app.models import Like, db
from app.forms import addLikeForm


likes_routes = Blueprint('likes', __name__)


@likes_routes.route('/<int:id>')
def get_likes(id):
    likes = Like.query.filter(Like.postId == id).all()
    return {'likes': [like.to_dict() for like in likes]}

@likes_routes.route('/', methods=['POST'])
def create_like():
    form = addLikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        like = Like (
            postId = form.data['postId'],
            username = form.data['username'],
            userId = form.data['userId']
        )
    db.session.add(like)
    db.session.commit()
    return {'like' : like.to_dict()}

@likes_routes.route('/delete/<int:userId>/<int:postId>', methods=['DELETE'])
def delete_comment(userId, postId):
    like = Like.query.filter(Like.userId == userId, Like.postId == postId).one()
    db.session.delete(like)
    db.session.commit()
    return { 'id' : like.id }
