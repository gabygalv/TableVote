from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash', '-created_at', '-updated_at', '-parties', '-partyuser')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    parties = db.relationship('Party', backref='user')
    partyuser = db.relationship('PartyUser', backref='user')
    favorite_restaurants = db.relationship('FavoriteRestaurant', backref='user')


    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.id} * Username: {self.username}>'

class Party(db.Model, SerializerMixin):
    __tablename__ = 'parties'

    serialize_rules = ('-',)

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    party_users = db.relationship('PartyUser', backref='party')

    def ___repr__(self):
        return f'<Party {self.id} * CreatorId {self.creator_id} * CreatedAt {self.created_at} >'

class PartyUser(db.Model, SerializerMixin):
    __tablename__ = 'party_users'

    serialize_rules = ('-',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    party_id = db.Column(db.Integer, db.ForeignKey('parties.id'))
    voted = db.Column(db.Boolean)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def ___repr__(self):
        return f'<PartyUser {self.id} * UserId {self.user_id} * UpdatedAt {self.updated_at} >'
    
class PartyVote(db.Model, SerializerMixin):
    __tablename__ = 'party_votes'

    serialize_rules = ('-',)

    id = db.Column(db.Integer, primary_key=True)
    partyuser_id = db.Column(db.Integer, db.ForeignKey('party_users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('parties.id'))
    voted = db.Column(db.Boolean)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def ___repr__(self):
        return f'<PartyVote {self.id} * PartyUserId {self.partyuser_id} * RestaurantId {self.restaurant_id} * UpdatedAt {self.updated_at} >'
    
class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    serialize_rules = ('-',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Varchar(255))
    address = db.Column(db.Varchar(255))
    link = db.Column(db.String)

    def ___repr__(self):
        return f'<Restaurant {self.id} * Name {self.name} * Link {self.link} >'

class FavoriteRestaurant(db.Model, SerializerMixin):
    __tablename__ = 'favorite_restaurants'

    serialize_rules = ('-',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('parties.id'))
    last_visit = db.Column(db.DateTime)
    def ___repr__(self):
        return f'<Restaurant {self.id} * Name {self.name} * Link {self.link} >'
