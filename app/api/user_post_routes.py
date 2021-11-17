from flask import Blueprint, jsonify, request
from app.models import Post


user_post_routes = Blueprint('user_posts', __name__)

@user_post_routes.route('/<int:id>')
def get_user_posts(id):
    posts = Post.query.filter(Post.userId == id).all()
    return {'posts': [post.to_dict() for post in posts]}
