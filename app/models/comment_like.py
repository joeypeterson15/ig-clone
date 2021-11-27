from .db import db


class CommentLike(db.Model):
    __tablename__ = 'comment_likes'

    id = db.Column(db.Integer, primary_key=True)
    userId= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    commentId = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=False)



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'commentId': self.commentId,
        }
