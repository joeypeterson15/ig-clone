from flask import Blueprint, jsonify, request
from app.models import Hashtag, db
from app.forms import addHashTagForm


hashtags_routes = Blueprint('hashtags', __name__)


# @hashtags_routes.route('/<int:id>')
# def get_hashtags(id):
#     hashtags = Hashtag.query.filter(Hashtag.postId == id).all()
#     return {'hashtags': [hashtag.to_dict() for hashtag in hashtags]}

@hashtags_routes.route('/<name>/<int:id>', methods=['POST'])
def create_hashtag(name, id):
    hashtag = Hashtag (
        name = name,
        postId = id
        )
    db.session.add(hashtag)
    db.session.commit()
    return {'hashtag' : hashtag.to_dict()}

# @hashtags_routes.route('/delete/<int:userId>/<int:postId>', methods=['DELETE'])
# def delete_hashtag(userId, postId):
#     hashtag = Hashtag.query.filter(Hashtag.userId == userId, hashtag.postId == postId).first()
#     db.session.delete(hashtag)
#     db.session.commit()
#     return { 'id' : hashtag.id }
