from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

SQLALCHEMY_DATABASE = os.getenv("SQLALCHEMY_DATABASE")

engine = create_engine(SQLALCHEMY_DATABASE)

Sessionlocal = sessionmaker(autocommit= False, autoflush=False, bind = engine)

Base = declarative_base()


def get_db():
    db = Sessionlocal()
    try:
        yield db
    finally:
        db.close()