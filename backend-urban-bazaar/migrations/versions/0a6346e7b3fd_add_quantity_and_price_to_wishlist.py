"""Add quantity and price to Wishlist

Revision ID: 0a6346e7b3fd
Revises: 4b22d8a1dd8f
Create Date: 2024-08-09 15:57:48.363028

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0a6346e7b3fd'
down_revision = '4b22d8a1dd8f'
branch_labels = None
depends_on = None


def upgrade():
    # Create new table with the updated schema
    op.create_table(
        'wishlist_new',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('product_id', sa.Integer(), nullable=False),
        sa.Column('quantity', sa.Integer(), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['user.id']),
        sa.ForeignKeyConstraint(['product_id'], ['product.id']),
        sa.PrimaryKeyConstraint('id')
    )
    # Copy data from the old table to the new table
    op.execute('INSERT INTO wishlist_new (id, user_id, product_id, quantity, price) SELECT id, user_id, product_id, quantity, price FROM wishlist')
    # Drop old table
    op.drop_table('wishlist')
    # Rename new table to the old table's name
    op.rename_table('wishlist_new', 'wishlist')

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('wishlist', schema=None) as batch_op:
        batch_op.drop_column('price')
        batch_op.drop_column('quantity')

    # ### end Alembic commands ###


def column_exists(table_name, column_name):
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    columns = [col['name'] for col in inspector.get_columns(table_name)]
    return column_name in columns
