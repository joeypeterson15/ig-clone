from .db import db
from sqlalchemy.sql import func

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    friendId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    friendAvatar = db.Column(db.String(1000))
    friendUsername = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'friendId': self.friendId ,
            'friendAvatar': self.friendAvatar,
            'friendUsername': self.friendUsername,
            'createdAt': self.createdAt.strftime("%Y/%m/%d %H:%M:%S")
        }
