from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"

class Settings(BaseSettings):
    OLLAMA_API_KEY:str = "a976094197904a95ada017c8b2ea12f0.0HKTva-Ay2vbTKELeSepncO1"
    SECRET_KEY:str = "84caf6135cd07b1fda5dd2067947afde243ad631d1caed9a62e0c329f59cc2b9"
    ALGORITHM:str ="HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES:int =30

    model_config = SettingsConfigDict(env_file=ENV_PATH)

@lru_cache
def get_settings():
    return Settings()

    