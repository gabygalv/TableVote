from flask import jsonify, make_response, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, api, db
from models import User, Party, PartyUser, PartyVote, Restaurant, FavoriteRestaurant