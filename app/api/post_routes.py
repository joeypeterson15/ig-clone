from flask import Blueprint, jsonify, request
from app.models import Post, User, db
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
