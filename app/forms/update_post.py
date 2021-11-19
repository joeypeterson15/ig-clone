from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class UpdatePostForm(FlaskForm):
    body = StringField('body')
