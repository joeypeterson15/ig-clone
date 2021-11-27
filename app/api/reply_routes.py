from flask import Blueprint, jsonify, request
from app.models import Reply, db
from app.forms import addReplyForm
from sqlalchemy import asc, desc


reply_routes = Blueprint('replies', __name__)


@reply_routes.route('/<int:commentId>')
def get_my_replies(commentId):
    replies = Reply.query.all()
    return {'comments': [reply.to_dict() for reply in replies]}

@reply_routes.route('/', methods=['POST'])
def create_reply():
    print('made it to back end!!!!')
    form = addReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reply = Reply (
            content = form.data['content'],
            commentId = form.data['commentId'],
            userId = form.data['userId'],
            avatar = form.data['avatar'],
            username = form.data['username']
        )
    print(reply)
    db.session.add(reply)
    db.session.commit()
    return {'comment' : reply.to_dict()}

# @reply_routes.route('/delete/<int:id>', methods=['DELETE'])
# def delete_reply(id):
#     print('hellooooo!!!!!')
#     reply = reply.query.get(id)
#     db.session.delete(reply)
#     db.session.commit()
#     return { 'replyId' : id }

# @reply_routes.route('/update/<int:id>', methods=['POST'])
# def update_reply(id):
#     form = updatereplyForm()
#     reply = reply.query.get(id)
#     reply.content = form.data['content']
#     db.session.commit()
#     return { 'replyId' : reply.id, 'reply' : reply.to_dict() }
