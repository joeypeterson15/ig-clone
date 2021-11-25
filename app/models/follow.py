from .db import db
from sqlalchemy.sql import func

class Follow(db.Model):
    __tablename__ = 'follows'
    id = db.Column(db.Integer, primary_key=True)
    userId= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'followId': self.followId,
            'createdAt': self.createdAt
        }
