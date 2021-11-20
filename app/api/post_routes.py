from flask import Blueprint, jsonify, request
from app.models import Post, User, db, Comment, Like, Hashtag
from app.forms import UpdatePostForm, addPostForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/<int:id>')
def get_my_posts(id):
    posts = Post.query.filter(Post.userId == id).all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/all/<int:id>')
def get_all_posts(id):
    posts = Post.query.filter(Post.userId != id).all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/', methods=['POST'])
def create_post():
    form = addPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post (
            body = form.data['body'],
            imageUrl = form.data['imageUrl'],
            userId = form.data['userId'],
            avatar = form.data['avatar'],
            username = form.data['username']
        )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()


@post_routes.route('/<int:postId>', methods=['DELETE'])
def delete_my_post(postId):
    post = Post.query.get(postId)
    comments = Comment.query.filter(Comment.postId == postId).all()
    likes = Like.query.filter(Like.postId == postId).all()
    hashtags = Hashtag.query.filter(Hashtag.postId == postId).all()
    [db.session.delete(comment) for comment in comments]
    [db.session.delete(like) for like in likes]
    [db.session.delete(hashtag) for hashtag in hashtags]
    # db.session.delete(comments)
    db.session.delete(post)
    db.session.commit()
    return {'postId' : postId}


@post_routes.route('/update/<int:id>', methods=['POST'])
def update_comment(id):
    form = UpdatePostForm()
    post = Post.query.get(id)
    post.body = form.data['body']
    db.session.commit()
    return { 'postId' : post.id, 'post' : post.to_dict() }
