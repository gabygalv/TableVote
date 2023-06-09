"""first table schemas

Revision ID: c3e250bc5186
Revises: 
Create Date: 2023-04-26 20:35:19.928077

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c3e250bc5186'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('restaurants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('link', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('favorite_restaurants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('restaurant_id', sa.Integer(), nullable=True),
    sa.Column('last_visit', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], name=op.f('fk_favorite_restaurants_restaurant_id_restaurants')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_favorite_restaurants_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('parties',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creator_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('selected_restaurant_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], name=op.f('fk_parties_creator_id_users')),
    sa.ForeignKeyConstraint(['selected_restaurant_id'], ['restaurants.id'], name=op.f('fk_parties_selected_restaurant_id_restaurants')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('party_users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('party_id', sa.Integer(), nullable=True),
    sa.Column('voted', sa.Boolean(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['party_id'], ['parties.id'], name=op.f('fk_party_users_party_id_parties')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_party_users_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('party_votes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('partyuser_id', sa.Integer(), nullable=True),
    sa.Column('restaurant_id', sa.Integer(), nullable=True),
    sa.Column('voted', sa.Boolean(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['partyuser_id'], ['party_users.id'], name=op.f('fk_party_votes_partyuser_id_party_users')),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], name=op.f('fk_party_votes_restaurant_id_restaurants')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('party_votes')
    op.drop_table('party_users')
    op.drop_table('parties')
    op.drop_table('favorite_restaurants')
    op.drop_table('users')
    op.drop_table('restaurants')
    # ### end Alembic commands ###
