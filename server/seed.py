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
    user2 = User(username='krista', email='krista@example.com', password_hash='password')
    user3 = User(username='val', email='val@example.com', password_hash='password')
    user4 = User(username='coco', email='coco@example.com', password_hash='password')
    user5 = User(username='dolly', email='dolly@example.com', password_hash='password')
    print('adding')
    db.session.add_all([user1, user2, user3, user4, user5])
    db.session.commit()
    print('users committed!')


    # create parties
    print('..')
    party1 = Party(creator_id=user1.id, created_at=datetime.now(), location='tucson', radius='8045.0', term='Pizza', price='1')
    party2 = Party(creator_id=user2.id, created_at=datetime.now(), location='phoenix', radius='8045.0', term='Pizza', price='2')
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

    
    #