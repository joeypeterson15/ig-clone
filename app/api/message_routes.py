from flask import Blueprint, jsonify, request
from app.models import Channel, Message


message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:userId>/<int:friendId>')
def get_messages(userId, friendId):
    messages = Message.query.filter(Message.userId == userId, Message.friendId == friendId).all()
    return {'messages': [message.to_dict() for message in messages]}
