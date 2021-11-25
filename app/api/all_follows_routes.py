from flask import Blueprint, jsonify, request
from app.models import Follow, db



all_follow_routes = Blueprint('all_follows', __name__)

@all_follow_routes.route('/')
def get_follows():
    follows = Follow.query.all()
    return {'follows': [follow.to_dict() for follow in follows]}
