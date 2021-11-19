from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class addChannelForm(FlaskForm):
    userId = IntegerField('userId')
    friendId = IntegerField('friendId')
    friendUsername = StringField('friendUsername')
    friendAvatar = StringField('friendAvatar')
