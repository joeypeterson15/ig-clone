from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class addReplyForm(FlaskForm):
    content = StringField('content')
    userId = IntegerField('userId')
    commentId = IntegerField('commentId')
    username = StringField('username')
    avatar = StringField('avatar')
