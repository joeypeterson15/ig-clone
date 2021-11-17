from flask import Blueprint, jsonify, request
from app.models import Post


all_post_routes = Blueprint('all_posts', __name__)

@all_post_routes.route('/<int:id>')
def get_all_posts(id):
    posts = Post.query.filter(Post.userId != id).all()
    return {'posts': [post.to_dict() for post in posts]}
