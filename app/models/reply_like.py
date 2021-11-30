from .db import db


class ReplyLike(db.Model):
    __tablename__ = 'replies_likes'

    id = db.Column(db.Integer, primary_key=True)
    userId= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    replyId = db.Column(db.Integer, db.ForeignKey('replies.id'), nullable=False)



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'replyId': self.replyId,
        }
