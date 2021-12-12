from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class addMainCommentForm(FlaskForm):
    content = StringField('content')
    userId = IntegerField('userId')
    postId = IntegerField('postId')
    username = StringField('username')
    avatar = StringField('avatar')
