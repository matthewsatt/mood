from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Moodlist, Song
from app.forms import AddSongForm, EditSongForm
from .utils import validation_errors_to_error_messages, load_csrf_token

song_routes = Blueprint("songs", __name__)


def own_song_or_404(id):
    return Song.query.filter_by(id=id, userId=current_user.id).first_or_404()


def owns_moodlist(moodlistId):
    return Moodlist.query.filter_by(
        id=moodlistId, userId=current_user.id).first() is not None


# ALL OF THE CURRENT USER'S SONGS, FOR THE SEARCH BAR
@song_routes.route("/search")
@login_required
def searchSongs():
    songs = Song.query.filter_by(userId=current_user.id).all()
    return jsonify([song.to_dict() for song in songs])


# GET ALL SONGS FOR SPECFIC MOOD LIST
@song_routes.route("/moodlists/<int:moodlistId>")
@login_required
def getMoodlistSongs(moodlistId):
    Moodlist.query.filter_by(
        id=moodlistId, userId=current_user.id).first_or_404()
    songs = Song.query.filter_by(moodlistId=moodlistId).all()
    return jsonify([song.to_dict() for song in songs])


@song_routes.route("/new", methods=['POST'])
@login_required
def newSong():
    form = AddSongForm()
    load_csrf_token(form)
    if form.validate_on_submit():
        if not owns_moodlist(form.data['moodlistId']):
            return {'errors': ['moodlistId : Moodlist not found.']}, 404
        new_song = Song(
            name=form.data["name"],
            artist=form.data["artist"],
            rating=form.data["rating"],
            song_url=form.data["song_url"] or None,
            song_image=form.data["song_image"] or None,
            moodlistId=form.data['moodlistId'],
            userId=current_user.id)
        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@song_routes.route("/edit", methods=["PUT"])
@login_required
def changeSong():
    data = request.json or {}
    song = own_song_or_404(data.get('id'))
    form = EditSongForm()
    load_csrf_token(form)
    if form.validate_on_submit():
        moodlistId = form.data['moodlistId'] or song.moodlistId
        if not owns_moodlist(moodlistId):
            return {'errors': ['moodlistId : Moodlist not found.']}, 404
        song.name = form.data['name']
        song.artist = form.data['artist']
        song.rating = form.data['rating']
        song.moodlistId = moodlistId
        # Links are optional, so only touch them when the client sends them
        for field in ('song_url', 'song_image'):
            if field in data:
                setattr(song, field, form.data[field] or None)
        db.session.commit()
        return song.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@song_routes.route("/delete/<int:songId>", methods=["DELETE"])
@login_required
def removeSong(songId):
    deleted_song = own_song_or_404(songId)
    db.session.delete(deleted_song)
    db.session.commit()
    return deleted_song.to_dict()


@song_routes.route("/one/<int:songId>")
@login_required
def getOneSong(songId):
    return own_song_or_404(songId).to_dict()
