from flask import Blueprint, jsonify, request
from app.models import Follow, db
from app.forms import addFollowForm


follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/<int:id>')
def get_follows(id):
    follows = Follow.query.filter(Follow.userId == id).all()
    return {'follows': [follow.to_dict() for follow in follows]}


@follow_routes.route('/', methods=['POST'])
def create_follow():
    form = addFollowForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        follow = Follow (
            followId = form.data['followId'],
            userId = form.data['userId']
        )
    db.session.add(follow)
    db.session.commit()
    return {'follow' : follow.to_dict()}


# @follow_routes.route('/delete/<int:id>', methods=['DELETE'])
# def delete_follow(id):
#     follow = Follow.query.get(id)

#     db.session.delete(follow)
#     db.session.commit()
#     return {'id' : follow.id}


@follow_routes.route('/delete/<int:userId>/<int:followId>', methods=['DELETE'])
def delete_follow(userId, followId):
    follow = Follow.query.filter(Follow.followId== followId, Follow.userId == userId).first()
    db.session.delete(follow)
    db.session.commit()
    return {'id' : follow.id}
