from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

class updateMainCommentForm(FlaskForm):
    content = StringField('content')
