import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from app.forms import like_comment_form

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.post_routes import post_routes
from .api.comment_routes import comment_routes
from .api.likes_routes import likes_routes
from .api.all_post_routes import all_post_routes
from .api.get_user_route import get_user_routes
from .api.user_post_routes import user_post_routes
from .api.follow_routes import follow_routes
from .api.main_post_routes import main_post_routes
from .api.channel_routes import channel_routes
from .api.all_user_routes import all_user_routes
from .api.message_routes import message_routes
from .api.hash_routes import hashtags_routes
from .api.hash_post_routes import hash_post_routes
from .api.every_post_routes import every_post_routes
from .api.follower_routes import follower_routes
from .api.all_follows_routes import all_follow_routes
from .api.comment_like_routes import comment_likes_routes
from .api.reply_routes import reply_routes


from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(post_routes, url_prefix='/api/posts')
app.register_blueprint(comment_routes, url_prefix='/api/comments')
app.register_blueprint(likes_routes, url_prefix='/api/likes')
app.register_blueprint(all_post_routes, url_prefix='/api/allposts')
app.register_blueprint(get_user_routes, url_prefix='/api/postuser')
app.register_blueprint(user_post_routes, url_prefix='/api/userposts')
app.register_blueprint(follow_routes, url_prefix='/api/follows')
app.register_blueprint(main_post_routes, url_prefix='/api/main')
app.register_blueprint(channel_routes, url_prefix='/api/channels')
app.register_blueprint(all_user_routes, url_prefix='/api/allusers')
app.register_blueprint(message_routes, url_prefix='/api/messages')
app.register_blueprint(hashtags_routes, url_prefix='/api/hashtags')
app.register_blueprint(hash_post_routes, url_prefix='/api/hashposts')
app.register_blueprint(every_post_routes, url_prefix='/api/everypost')
app.register_blueprint(follower_routes, url_prefix='/api/followers')
app.register_blueprint(all_follow_routes, url_prefix='/api/allfollows')
app.register_blueprint(comment_likes_routes, url_prefix='/api/commentlikes')
app.register_blueprint(reply_routes, url_prefix='/api/replies')

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
