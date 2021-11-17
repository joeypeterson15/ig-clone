from flask import Blueprint, jsonify, request
from app.models import Comment, db


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>')
def get_my_posts(id):
    comments = Comment.query.filter(Comment.postId == id)
    return {'comments': [comment.to_dict() for comment in comments]}
