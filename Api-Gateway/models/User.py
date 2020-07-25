class User(object):
    def __init__(self, username, email, registration_date):
        self.username = username
        self.email = email
        self.registration_date = registration_date

    def to_dict(self):
        ans = {
            u'username': self.username,
            u'email': self.email,
            u'registration_date': self.registration_date,
        }
        return ans

    @staticmethod
    def from_dict(source):
        return User(source['username'], source['email'], source['registration_date'])