"""empty message

Revision ID: 5d923a9b926d
Revises: b02ab2dbce34
Create Date: 2023-05-04 16:34:09.219255

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5d923a9b926d'
down_revision = 'b02ab2dbce34'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('parties', schema=None) as batch_op:
        batch_op.add_column(sa.Column('past_section', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('parties', schema=None) as batch_op:
        batch_op.drop_column('past_section')

    # ### end Alembic commands ###