from .db import db

class HashPost(db.Model):
    __tablename__='hash_posts'

    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True, nullable=False)
    hashtagId = db.Column(db.Integer, db.ForeignKey('hashtags.id'), primary_key=True, nullable=False)


    def to_dict(self):
        return {
            'postId': self.postId,
            'hashtagId' : self.hashtagId
        }
