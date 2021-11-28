from flask import Blueprint, jsonify, request
from app.models import Channel, User, db, Comment, Like, Message
from app.forms import addChannelForm

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/<int:id>')
def get_my_channels(id):
    channels = Channel.query.filter(Channel.userId == id).all()
    return {'channels': [channel.to_dict() for channel in channels]}


@channel_routes.route('/', methods=['POST'])
def create_channel():
    form = addChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel (
            userId = form.data['userId'],
            friendId = form.data['friendId'],
            friendAvatar = form.data['friendAvatar'],
            friendUsername = form.data['friendUsername'],
        )
    db.session.add(channel)
    db.session.commit()
    return {'channel' : channel.to_dict()}

@channel_routes.route('/delete/<int:channelId>', methods=['DELETE'])
def delete_channel(channelId):
    channel = Channel.query.get(channelId)
    messages = Message.query.filter(Message.channelId == channelId).all()
    print('messages!!!!!!', messages)
    [db.session.delete(message) for message in messages]
    db.session.commit()
    db.session.delete(channel)
    db.session.commit()
    return {'channelId' : channelId}
