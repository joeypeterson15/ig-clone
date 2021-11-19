from .db import db
from sqlalchemy.sql import func

class Hashtag(db.Model):
    __tablename__ = 'hashtags'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30))
    # followId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,

        }
