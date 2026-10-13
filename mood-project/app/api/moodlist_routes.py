from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import func
from app.models import db, Moodlist, Song
from app.forms import AddMoodForm, EditMoodForm
from .utils import validation_errors_to_error_messages, load_csrf_token

moodlist_routes = Blueprint("moodlists", __name__)


def own_moodlist_or_404(id):
    return Moodlist.query.filter_by(id=id, userId=current_user.id).first_or_404()


@moodlist_routes.route("/")
@login_required
def get_all_moodlists():
    "Returns all of the current user's moodlists, with how many songs each has"
    moodlists = Moodlist.query.filter_by(userId=current_user.id).all()
    counts = dict(
        db.session.query(Song.moodlistId, func.count(Song.id))
        .filter(Song.userId == current_user.id)
        .group_by(Song.moodlistId))
    return jsonify([
        {**mood.to_dict(), 'songCount': counts.get(mood.id, 0)}
        for mood in moodlists])


@moodlist_routes.route("/new", methods=['POST'])
@login_required
def create_new_moodlist():
    form = AddMoodForm()
    load_csrf_token(form)
    if form.validate_on_submit():
        new_moodlist = Moodlist(
            name=form.data["name"],
            color=form.data["color"],
            userId=current_user.id)
        db.session.add(new_moodlist)
        db.session.commit()
        return {"mood": new_moodlist.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@moodlist_routes.route("/edit", methods=["PUT"])
@login_required
def edit_moodlist():
    '''this route passes in the new moodlist data AND the moodlist id'''
    moodlist = own_moodlist_or_404((request.json or {}).get('id'))
    form = EditMoodForm()
    load_csrf_token(form)
    if form.validate_on_submit():
        moodlist.name = form.data['name']
        moodlist.color = form.data['color']
        db.session.commit()
        return moodlist.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@moodlist_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_moodlist(id):
    deleted_mood = own_moodlist_or_404(id)
    db.session.delete(deleted_mood)
    db.session.commit()
    return deleted_mood.to_dict()
