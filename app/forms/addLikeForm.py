from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class addLikeForm(FlaskForm):
    username = StringField('username')
    userId = IntegerField('userId')
    postId = IntegerField('postId')
