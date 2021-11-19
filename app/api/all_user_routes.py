from flask import Blueprint, jsonify
from app.models import User

all_user_routes = Blueprint('all_users', __name__)


@all_user_routes.route('/')
def get_all_users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}
