from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from random import sample, randint


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo", last_name="Lition", email='demo@aa.io',username='Demo', profile_pic="", header_pic="", description="", hashed_password='password')
    rockfan = User(
        first_name="Rock", last_name="Fan", email='rockfan@aa.io',username='Rockfan', profile_pic="", header_pic="", description="", hashed_password='password')
    popfan = User(
        first_name="Pop", last_name="Fan", email='popfan@aa.io',username='Popfan', profile_pic="", header_pic="", description="", hashed_password='password')
    electronicfan = User(
        first_name="Electronic", last_name="Fan", email='electronicfan@aa.io',username='Electronicfan', profile_pic="", header_pic="", description="", hashed_password='password')
    alternativefan = User(
           first_name="Alternative", last_name="Fan", email='alternativefan@aa.io',username='Alternativefan', profile_pic="", header_pic="", description="", hashed_password='password')
    hauntologyfan = User(
        first_name="Hauntology", last_name="Fan", email='Hauntologyfan@aa.io',username='Hauntologyfan', profile_pic="", header_pic="", description="", hashed_password='password')
    classicalfan = User(
        first_name="Classical", last_name="Fan", email='Classicalfan@aa.io',username='Classicalfan', profile_pic="", header_pic="", description="", hashed_password='password')
    rapfan = User(
        first_name = 'Rap', last_name = 'Fan',  email='rapfan@aa.io',     username ='Rapfan', profile_pic="", header_pic="",  description="",    password='password')
    indiefan = User(
        first_name = 'Indie', last_name = 'Fan',  email='indiefan@aa.io', username ='Indiefan', profile_pic="", header_pic="",      description="", hashed_password='password')
    countryfan = User(
        first_name = 'Country', last_name = 'Fan',  email='countryfan@aa.io', username ='countryfan', profile_pic='', header_pic='',  description='', hashed_password='password')
    metalfan = User(
        first_name = 'Metal', last_name = 'Fan', email='metalfan@aa.io', username ='Metalfan', profile_pic="", header_pic="",  description="", hashed_password='password')

    all_users = [demo, rockfan, popfan, electronicfan, alternativefan, hauntologyfan, classicalfan, rapfan, indiefan, countryfan, metalfan]

    for user in all_users:
        following = sample(all_users, randint(1, 4))
        
        try:
            remove = following.index(user)
            following.pop(remove)
        except:
            pass

        user.following = following
    
    db.session.add_all(all_users)
    db.session.commit()
    return all_users



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
    db.session.execute(text("DELETE FROM follows"))    
    db.session.commit()
