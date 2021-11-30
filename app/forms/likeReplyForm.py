from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class ReplyLikeForm(FlaskForm):
    userId = IntegerField('userId')
    replyId = IntegerField('replyId')
