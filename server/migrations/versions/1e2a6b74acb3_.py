"""empty message

Revision ID: 1e2a6b74acb3
Revises: 44a7747ec3e2
Create Date: 2023-05-03 18:47:02.560344

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e2a6b74acb3'
down_revision = '44a7747ec3e2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('parties', schema=None) as batch_op:
        batch_op.alter_column('selected_restaurant_id',
               existing_type=sa.INTEGER(),
               type_=sa.String(),
               existing_nullable=True)
        batch_op.drop_constraint('fk_parties_selected_restaurant_id_restaurants', type_='foreignkey')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('parties', schema=None) as batch_op:
        batch_op.create_foreign_key('fk_parties_selected_restaurant_id_restaurants', 'restaurants', ['selected_restaurant_id'], ['id'])
        batch_op.alter_column('selected_restaurant_id',
               existing_type=sa.String(),
               type_=sa.INTEGER(),
               existing_nullable=True)

    # ### end Alembic commands ###
