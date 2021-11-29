from flask import Blueprint, jsonify, request
from app.models import Channel, Message, db
from app.forms import addMessageForm


your_messages_routes = Blueprint('your_messages', __name__)


@your_messages_routes.route('/<int:userId>/<int:friendId>')
def get_messages(userId, friendId):
    messages = Message.query.filter(Message.userId == friendId, Message.friendId == userId).all()
    return {'messages': [message.to_dict() for message in messages]}
