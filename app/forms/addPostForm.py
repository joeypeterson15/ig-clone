from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class addPostForm(FlaskForm):
    body = StringField('body')
    userId = IntegerField('userId')
    imageUrl = StringField('imageUrl')
