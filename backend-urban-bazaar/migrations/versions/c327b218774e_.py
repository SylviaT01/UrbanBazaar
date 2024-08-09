"""empty message

Revision ID: c327b218774e
Revises: 0a6346e7b3fd
Create Date: 2024-08-09 16:34:03.685514

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c327b218774e'
down_revision = '0a6346e7b3fd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('wishlist', schema=None) as batch_op:
        batch_op.drop_column('quantity')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('wishlist', schema=None) as batch_op:
        batch_op.add_column(sa.Column('quantity', sa.INTEGER(), nullable=False))

    # ### end Alembic commands ###