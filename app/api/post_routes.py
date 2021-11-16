from flask import Blueprint, jsonify
from app.models import Post, User

post_routes = Blueprint('posts', __name__)


@post_routes.route('/<int:id>')
def get_my_posts(id):
    posts = Post.query.filter(Post.userId == id).all()
    return {'posts': [post.to_dict() for post in posts]}
