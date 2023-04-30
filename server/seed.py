from datetime import datetime
from config import db, app
from models import User, Party, PartyUser, Restaurant, PartyVote, FavoriteRestaurant

with app.app_context():

    print('deleting')
    User.query.delete()
    Party.query.delete()
    PartyUser.query.delete()
    Restaurant.query.delete()
    PartyVote.query.delete()
    FavoriteRestaurant.query.delete()
    print('deleted')


    # create users
    print('..')
    user1 = User(username='gaby', email='gaby@example.com', password_hash='password')
    user2 = User(username='gaby1', email='gaby1@example.com', password_hash='password')
    print('adding')
    db.session.add_all([user1, user2])
    db.session.commit()
    print('users committed!')


    # create restaurants
    print('..')
    restaurant1 = Restaurant(name='McDonalds', address='123 Main St', link='https://www.mcdonalds.com/')
    restaurant2 = Restaurant(name='Burger King', address='456 Elm St', link='https://www.bk.com/')
    restaurant3 = Restaurant(name='Pizza Hut', address='789 Oak St', link='https://www.pizzahut.com/')
    print('adding')
    db.session.add_all([restaurant1, restaurant2, restaurant3])
    db.session.commit()
    print('restaurants committed!')

    # create parties
    print('..')
    party1 = Party(creator_id=user1.id, created_at=datetime.now())
    party2 = Party(creator_id=user2.id, created_at=datetime.now())
    print('adding')
    db.session.add_all([party1, party2])
    db.session.commit()
    print('party committed!')


    # create party users
    print('..')
    partyuser1 = PartyUser(user_id=user1.id, party_id=party1.id, voted=False, updated_at=datetime.now())
    partyuser2 = PartyUser(user_id=user2.id, party_id=party2.id, voted=False, updated_at=datetime.now())
    print('adding')
    db.session.add_all([partyuser1, partyuser2])
    db.session.commit()
    print('partyusers committed!')

    # create party votes
    print('..')
    partyvote1 = PartyVote(partyuser_id=partyuser1.id, restaurant_id=restaurant1.id, voted=False, updated_at=datetime.now())
    partyvote2 = PartyVote(partyuser_id=partyuser2.id, restaurant_id=restaurant2.id, voted=False, updated_at=datetime.now())
    print('adding')
    db.session.add_all([partyvote1, partyvote2])
    db.session.commit()
    print('partyusers committed!')
    # create favorite restaurants
    print('..')
    favoriterestaurant1 = FavoriteRestaurant(user_id=user1.id, restaurant_id=restaurant1.id, last_visit=datetime.now())
    favoriterestaurant2 = FavoriteRestaurant(user_id=user2.id, restaurant_id=restaurant2.id, last_visit=datetime.now())
    print('adding')
    db.session.add_all([favoriterestaurant1, favoriterestaurant2])
    db.session.commit()
    print('favrestaurants committed!')