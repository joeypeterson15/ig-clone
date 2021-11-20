from flask import Blueprint, jsonify, request
from app.models import Post, Hashtag


hash_post_routes = Blueprint('hash_posts', __name__)

@hash_post_routes.route('/<name>')
def get_main_posts(name):
    nestedPosts = []
    hashtags = Hashtag.query.filter(Hashtag.name == name).all()
    postIds = [hashtag.to_dict()['postId'] for hashtag in hashtags]
    for i in postIds:
        nestedPosts.append(Post.query.filter(Post.id == i).all())
    posts = [item for sublist in nestedPosts for item in sublist]
    return {'posts': [post.to_dict() for post in posts]}
