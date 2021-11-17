from flask import Blueprint, jsonify, request
from app.models import Post, User, db, Comment
from app.forms import addPostForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/<int:id>')
def get_my_posts(id):
    posts = Post.query.filter(Post.userId == id).all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/', methods=['POST'])
def create_post():
    form = addPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post (
            body = form.data['body'],
            imageUrl = form.data['imageUrl'],
            userId = form.data['userId']
        )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()

@post_routes.route('/<int:postId>', methods=['DELETE'])
def delete_my_post(postId):
    post = Post.query.get(postId)
    comments = Comment.query.filter(Comment.postId == postId).all()
    [db.session.delete(comment) for comment in comments]
    # db.session.delete(comments)
    db.session.delete(post)
    db.session.commit()
    return {'postId' : postId}
