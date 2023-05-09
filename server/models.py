from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash', '-created_at', '-updated_at', '-parties', '-partyuser', '-favorite_restaurants')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    parties = db.relationship('Party', backref='user')
    partyuser = db.relationship('PartyUser', backref='user')


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

    serialize_rules = ('-party_users',)

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.current_date())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    location = db.Column(db.String)
    radius = db.Column(db.Float)
    term = db.Column(db.String)
    price = db.Column(db.Integer)
    selected_restaurant_id = db.Column(db.String)
    past_section = db.Column(db.Boolean)

    party_users = db.relationship('PartyUser', backref='party', cascade='all,delete-orphan')

    def __repr__(self):
        return f'<Party {self.id} * CreatorId {self.creator_id} * CreatedAt {self.created_at} >'

class PartyUser(db.Model, SerializerMixin):
    __tablename__ = 'party_users'

    serialize_rules = ('-updated_at', '-party_vote', '-user.id')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    party_id = db.Column(db.Integer, db.ForeignKey('parties.id'))
    voted = db.Column(db.Boolean)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    party_vote = db.relationship('PartyVote', backref='partyuser', cascade='all,delete-orphan')
    selected_restaurant = association_proxy('party', 'selected_restaurant')


    def ___repr__(self):
        return f'<PartyUser {self.id} * UserId {self.user_id} * UpdatedAt {self.updated_at} >'
    
class PartyVote(db.Model, SerializerMixin):
    __tablename__ = 'party_votes'

    serialize_rules = ('-updated_at', '-partyuser_id', '-restaurant_id')

    id = db.Column(db.Integer, primary_key=True)
    partyuser_id = db.Column(db.Integer, db.ForeignKey('party_users.id'))
    restaurant_id = db.Column(db.String, db.ForeignKey('restaurants.id'))
    voted = db.Column(db.Boolean)
    updated_at = db.Column(db.DateTime, server_default=db.func.current_date())

    def ___repr__(self):
        return f'<PartyVote {self.id} * PartyUserId {self.partyuser_id} * RestaurantId {self.restaurant_id} * UpdatedAt {self.updated_at} >'
    
class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    serialize_rules = ('-',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    category = db.Column(db.String)
    address = db.Column(db.String)
    link = db.Column(db.String)
    image_url = db.Column(db.String)
    rating = db.Column(db.Float)
    review_count = db.Column(db.Integer)
    yelp_id = db.Column(db.String)

    party_votes = db.relationship('PartyVote', backref='restaurant')

    def ___repr__(self):
        return f'<Restaurant {self.id} * Name {self.name} * Link {self.link} >'


