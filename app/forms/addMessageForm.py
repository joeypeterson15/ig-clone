from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class addMessageForm(FlaskForm):
    content = StringField('content')
    userId = IntegerField('userId')
    friendId = IntegerField('friendId')
    userAvatar = StringField('userAvatar')
    channelId = IntegerField('channelId')
