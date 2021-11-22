from flask import Blueprint, jsonify, request
from app.models import Follow, db
from app.forms import addFollowForm


follower_routes = Blueprint('followers', __name__)

@follower_routes.route('/<int:id>')
def get_follows(id):
    follows = Follow.query.filter(Follow.followId == id).all()
    return {'follows': [follow.to_dict() for follow in follows]}
