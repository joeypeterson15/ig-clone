from .db import db
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    avatar = db.Column(db.String(1000), nullable=False)
    content = db.Column(db.String(1000), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.postId,
            'userId' : self.userId,
            'content' : self.content,
            'createdAt': self.createdAt.strftime("%Y/%m/%d %H:%M:%S"),
            'username' : self.username,
            'avatar' : self.avatar
        }
