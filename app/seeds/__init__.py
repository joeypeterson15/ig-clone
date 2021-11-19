from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .follows import seed_follows, undo_follows
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .hashtags import seed_hashtags, undo_hashtags

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_hashtags()
    seed_posts()
    seed_follows()
    seed_comments()
    # seed_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_hashtags()
    undo_posts()
    undo_follows()
    undo_comments()
    # undo_likes()
    # Add other undo functions here
