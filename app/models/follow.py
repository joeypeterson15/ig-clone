from .db import db
from sqlalchemy.sql import func

class Follow(db.Model):
    __tablename__ = 'follows'
    id = db.Column(db.Integer, primary_key=True)
    userId= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'imageUrl': self.imageUrl,
            'createdAt' : self.createdAt,
            'body' : self.body,
            'likes' : self.likes
        }
