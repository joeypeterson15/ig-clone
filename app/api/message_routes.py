from flask import Blueprint, jsonify, request
from app.models import Channel, Message, db
from app.forms import addMessageForm


message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:userId>/<int:friendId>')
def get_messages(userId, friendId):
    messages1 = Message.query.filter(Message.userId == userId, Message.friendId == friendId).all()
    messages2 = Message.query.filter(Message.userId == friendId, Message.friendId == userId).all()
    messages = sorted([*messages1 , *messages2], key=lambda message: message.createdAt)
    print(messages)
    return {'messages': [message.to_dict() for message in messages]}

@message_routes.route('/', methods=['POST'])
def create_post():
    form = addMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message (
            content = form.data['content'],
            userId = form.data['userId'],
            userAvatar = form.data['userAvatar'],
            friendId = form.data['friendId'],
            channelId = form.data['channelId']
        )
    db.session.add(message)
    db.session.commit()
    return message.to_dict()
