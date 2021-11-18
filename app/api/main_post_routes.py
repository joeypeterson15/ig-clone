from flask import Blueprint, jsonify, request
from app.models import Post, User, Follow


main_post_routes = Blueprint('main_posts', __name__)

@main_post_routes.route('/<int:id>')
def get_main_posts(id):
    posts = []
    follows = Follow.query.filter(Follow.userId == id).all()
    userIds = [follow.to_dict()['followId'] for follow in follows]
    for i in userIds:
        posts.append(Post.query.filter(Post.userId == i).first())
    return {'posts': [post.to_dict() for post in posts]}
