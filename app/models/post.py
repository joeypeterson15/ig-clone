from .db import db
from sqlalchemy.sql import func

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    imageUrl = db.Column(db.String(10485760), nullable=True)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())
    body = db.Column(db.String(1000), nullable=True)
    likes = db.Column(db.Integer, default = 0)
    username = db.Column(db.String(100), nullable=False)
    avatar = db.Column(db.String(1000), nullable=False)
    # hashtagId = db.Column(db.Integer, db.ForeignKey('hashtags.id'), nullable=True)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'imageUrl': self.imageUrl,
            'createdAt': self.createdAt.strftime("%Y/%m/%d %H:%M:%S"),
            'body' : self.body,
            'likes' : self.likes,
            'username' : self.username,
            'avatar' : self.avatar
        }
