import json

from cryptography.fernet import Fernet, InvalidToken

from config import FERNET_KEY


def decrypt_data(response):
    try:
        fernet_system = Fernet(FERNET_KEY)
        response_bytes = response.split("'")[1]
        decrypted_data = fernet_system.decrypt(response_bytes).decode()
        decrypted_data = decrypted_data.replace("'", "\"")
        dict_data = json.loads(decrypted_data)
        return dict_data
    except InvalidToken:
        print("Invalid token provided for decryption")
        return {"error": "Invalid token decrypt"}, 401
