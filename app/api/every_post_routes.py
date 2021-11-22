from flask import Blueprint, jsonify, request
from app.models import Post, User, db, Comment, Like, Hashtag

every_post_routes = Blueprint('every_posts', __name__)


@every_post_routes.route('/')
def get_my_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}
