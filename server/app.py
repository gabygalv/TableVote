from flask import jsonify, make_response, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

import requests

from config import app, api, db
from models import User, Party, PartyUser, PartyVote, Restaurant, FavoriteRestaurant

class Signup(Resource):

    def post(self):
        data = request.get_json()
        print(data)
        try:
            new_user = User(
                username = data['username'],
                customer = data['customer']
            )
            new_user.password_hash = data['password']
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)

        except:
            return make_response({'error': 'signup exception'}, 422)

class CheckSession(Resource):

    def get(self):
        user_id = session.get('user_id')
        
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        
        current_user = User.query.filter(User.id == user_id).first()
        return current_user.to_dict(), 200

class Login(Resource):
    
    def post(self):
        data = request.get_json()
        print(data)
        check_user = User.query.filter(User.email == data['email']).first()
        print(check_user)
        if check_user and check_user.authenticate(data['password']):
            session['user_id'] = check_user.id

            return make_response(check_user.to_dict(), 200)
        return {'error': 'Unauthorized'}, 401
        
class Logout(Resource):

    def delete(self):
        
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        return {'error': '401 Unauthorized'}, 401

class Home(Resource):
    
    def get(self):
        return '<h1>TableVote is alive!<h1>'
    
class Users(Resource):
    def get(self):
        users = [item.to_dict() for item in User.query.all()]
        return make_response(users, 200)

class Parties(Resource):
    def get(self):
        parties = [item.to_dict() for item in Party.query.all()]
        return make_response(parties, 200)
    
    def post(self):
        if session.get('user_id'):
            data = request.get_json()

            new_party = Party(
                creator_id = data['creator_id'],
                location = data['location'],
                term = data['term'],
                radius = data['radius'],
                price = data['price']
                )
            db.session.add(new_party)
            db.session.commit()

            return make_response(new_party.to_dict(), 201)
        return {'error': 'Unauthorized'}, 401

class PartyUsers(Resource):
    def get(self):
        party_users = [item.to_dict() for item in PartyUser.query.all()]
        return make_response(party_users, 200)
    def post(self):
        if session.get('user_id'):
            usernames = request.get_json()
            users = User.query.filter(User.username.in_(usernames)).all()
            for user in users:
                user_id = user.id
                partuser = PartyUser(
                party_id=usernames['party_id'],
                user_id=user_id
                )
                db.session.add(partuser)
            db.session.commit()
            return make_response({'message': 'PartyUsers added successfully'}, 201)
        return make_response({'message': 'Unauthorized'}, 401)
    
    def post(self):
        if session.get('user_id'):
            data = request.get_json()
        
            party_id = data.get('party_id')
            usernames = data.get('usernames')
            
            users = User.query.filter(User.username.in_(usernames)).all()
            for user in users:
                partuser = PartyUser(
                    party_id=party_id,
                    user_id=user.id
                )
                db.session.add(partuser)
            db.session.commit()
            return make_response({'message': 'PartyUsers added'}, 201)
        return make_response({'message': 'Unauthorized'}, 401)


class PartyVotes(Resource):
    def get(self):
        party_votes = [item.to_dict() for item in PartyVote.query.all()]
        return make_response(party_votes, 200)

class Restaurants(Resource):
    pass

class FavoriteRestaurants(Resource):
    pass

class YelpSearch(Resource):
    def get(self, ):
        location = request.args.get('location')
        term = request.args.get('term')
        radius = request.args.get('radius')
        price = request.args.get('price')
        sort = 'best_match'

        headers = {
            'Authorization': 'Bearer <api_key>',
            'Content-Type': 'application/json',
        }

        params = {
            'location': location,
            'term': term,
            'radius': radius,
            'price': price,
            'sort_by': sort,
            'limit': 10
        }
        response = requests.get('https://api.yelp.com/v3/businesses/search?', headers=headers, params=params)
        print(response)



        return response.json()

api.add_resource(Home, '/')
api.add_resource(Users, '/users')
api.add_resource(Parties, '/parties')
api.add_resource(PartyUsers, '/partyusers')
api.add_resource(PartyVotes, '/partyvotes')
api.add_resource(Restaurants, '/restaurants')
api.add_resource(FavoriteRestaurants, '/favoriterestaurants')
api.add_resource(YelpSearch, '/yelpsearch')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)