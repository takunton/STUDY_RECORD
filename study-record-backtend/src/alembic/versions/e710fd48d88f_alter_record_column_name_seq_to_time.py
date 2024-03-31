"""alter record column name seq to time

Revision ID: e710fd48d88f
Revises: 26247b4f9f1e
Create Date: 2024-03-31 09:37:28.278522

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e710fd48d88f'
down_revision: Union[str, None] = '26247b4f9f1e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('record', sa.Column('time', sa.Integer(), nullable=False))
    op.drop_column('record', 'seq')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('record', sa.Column('seq', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_column('record', 'time')
    # ### end Alembic commands ###