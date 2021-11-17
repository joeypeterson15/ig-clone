from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class addCommentForm(FlaskForm):
    content = StringField('content')
    userId = IntegerField('userId')
    postId = IntegerField('postId')
