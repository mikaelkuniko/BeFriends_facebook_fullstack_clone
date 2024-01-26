from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    print("Seed in users")
    demo = User(
        first_name='John',
        last_name='Doe',
        username='Demo',
        email='demo@aa.io',
        password='password',
        birthday='Feb 14, 1996',
        gender='Male'
        )
    mikael = User(
        first_name='Mikael',
        last_name='Kuniko',
        username='myko',
        email='myko@aa.io',
        password='password',
        birthday='Feb 28, 1996',
        gender='Male'
        )
    agnes = User(
        first_name='Agnes',
        last_name='Song',
        username='aggy',
        email='aggy@aa.io',
        password='password',
        birthday='Mar 14, 1996',
        gender='Female'
        )
    sergio = User(
        first_name='Sergio',
        last_name='Zap',
        username='serg',
        email='sergio@aa.io',
        password='password',
        birthday='Jan 24, 1998',
        gender='Male'
        )
    lily = User(
        first_name='Lily',
        last_name='Mac',
        username='lilymax',
        email='lily@aa.io',
        password='password',
        birthday='Aug 15, 1994',
        gender='Female'
        )
    jennie = User(
        first_name='Jennie',
        last_name='Ruby',
        username='jennierubyjane',
        email='jennie@aa.io',
        password='password',
        birthday='Jan 16, 1996',
        gender='Female'
        )
    lisa = User(
        first_name='Lisa',
        last_name='Manobel',
        username='lalisa',
        email='lisa@aa.io',
        password='password',
        birthday='Mar 27, 1997',
        gender='Female'
        )
    robert = User(
        first_name='Robert',
        last_name="Downey",
        username='marnie',
        email='marnie@aa.io',
        password='password',
        birthday='Apr 4, 1965',
        gender='Male'
        )
    zendaya = User(
        first_name='Zendaya',
        last_name="Coleman",
        username='zendaya',
        email='zendaya@aa.io',
        password='password',
        birthday='Sep 1, 1996',
        gender='Female'
        )
    tom = User(
        first_name='Tom',
        last_name="Holland",
        username='spiderman',
        email='spidey@aa.io',
        password='password',
        birthday='Jun 1, 1996',
        gender='Male'
        )
    chrollo = User(
        first_name='Chrollo',
        last_name='Lucilfer',
        username='chrollo',
        email='chrollo@aa.io',
        password='password',
        birthday='Aug 17, 1996',
        gender='Male'
        )
    kendall = User(
        first_name='Kendall',
        last_name='Jenner',
        username='ken',
        email='kenny@aa.io',
        password='password',
        birthday='Nov 3, 1995',
        gender='Female'
        )

    print("About to add users to database")
    db.session.add(demo)
    print("demo added")
    db.session.add(mikael)
    db.session.add(agnes)
    db.session.add(lily)
    db.session.add(sergio)
    db.session.add(jennie)
    db.session.add(lisa)
    db.session.add(chrollo)
    db.session.add(robert)
    db.session.add(zendaya)
    db.session.add(tom)
    db.session.add(kendall)
    db.session.commit()


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
        db.session.execute("DELETE FROM users")

    db.session.commit()
