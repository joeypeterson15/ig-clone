from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class addCommentLikeForm(FlaskForm):
    userId = IntegerField('userId')
    commentId = IntegerField('commentId')
