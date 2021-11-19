from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class updateCommentForm(FlaskForm):
    content = StringField('content')
