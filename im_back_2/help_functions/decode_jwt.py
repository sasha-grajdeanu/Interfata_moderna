import jwt

from config import JWT_KEY


def decode_jwt(jwt_token):
    try:
        current_user = jwt.decode(jwt_token, JWT_KEY, algorithms=['HS256'])
        print(current_user)
        user = current_user['sub']
        print(type(user))
        return user
    except jwt.ExpiredSignatureError:
        return {"error": "Expired Token"}, 401
    except jwt.InvalidSignatureError:
        return {"error": "Invalid Signature"}, 401
    except jwt.InvalidTokenError:
        return {"error": "Invalid Token"}, 401
