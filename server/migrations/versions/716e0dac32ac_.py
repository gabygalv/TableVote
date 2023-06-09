"""empty message

Revision ID: 716e0dac32ac
Revises: d1a918bd046f
Create Date: 2023-04-29 17:20:06.984280

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '716e0dac32ac'
down_revision = 'd1a918bd046f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('parties', schema=None) as batch_op:
        batch_op.add_column(sa.Column('location', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('radius', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('term', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('price', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('parties', schema=None) as batch_op:
        batch_op.drop_column('price')
        batch_op.drop_column('term')
        batch_op.drop_column('radius')
        batch_op.drop_column('location')

    # ### end Alembic commands ###
