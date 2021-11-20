from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class addHashTagForm(FlaskForm):
    name = StringField('name')
    postId = IntegerField('postId')
