from flask import Blueprint, jsonify, request
from app.models import Post, Follow
from functools import reduce



all_post_routes = Blueprint('all_posts', __name__)

# @all_post_routes.route('/<int:id>')
# def get_all_posts(id):
#     posts = Post.query.filter(Post.userId != id).all()
#     return {'posts': [post.to_dict() for post in posts]}


@all_post_routes.route('/<int:id>')
def get_all_posts(id):
    allPosts = []
    follows = Follow.query.filter(Follow.userId == id).all()
    userIds = [follow.to_dict()['followId'] for follow in follows]
    allPosts.append(Post.query.filter(Post.userId.notin_(userIds), Post.userId != id).all())
    posts = [item for sublist in allPosts for item in sublist]
    
    return {'posts': [post.to_dict() for post in posts]}
