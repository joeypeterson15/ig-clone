from flask import Blueprint, jsonify, request
from app.models import User, db, Post



get_user_routes = Blueprint('post_user', __name__)


@get_user_routes.route('/<int:id>')
def get_user(id):
    user = User.query.get(id)
    return {'user': user.to_dict() }
