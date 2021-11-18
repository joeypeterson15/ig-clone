from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class addFollowForm(FlaskForm):
    userId = IntegerField('userId')
    followId = IntegerField('followId')
