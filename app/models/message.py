from .db import db
from sqlalchemy.sql import func

class Message(db.Model):

    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    userAvatar = db.Column(db.String(1000), nullable=False)
    friendId = db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    channelId = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'userId': self.userId,
            'userAvatar': self.userAvatar,
            'friendId': self.friendId,
            'channelId': self.channelId,
            'createdAt': self.createdAt.strftime("%Y/%m/%d %H:%M:%S")
        }
