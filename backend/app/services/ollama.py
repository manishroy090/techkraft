import os
from ollama import Client
from fastapi.responses import StreamingResponse
from config import get_settings,Settings



settings =  Settings()  

client = Client(
    host="https://ollama.com",
    headers={'Authorization': 'Bearer ' + settings.OLLAMA_API_KEY}
)

async def generateSummary(data):
    in_thinking = False
    content = ''
    thinking = ''
    contentdata = []
    messages = [
      {
        'role':"system",
        'content':"You are an expert technical reviewer summarizing job candidates for a hiring team. never give the result on coding format or programing lang use this data and give brief summary on detials so i post it on linkedin"
      },
      {
        'role':"user",
        'content':data
      }
    ]
    for part in client.chat('gpt-oss:120b', messages=messages, stream=True):
        if part.message.thinking:
            if not in_thinking:
                in_thinking = True
                print('Thinking:\n', end='', flush=True)
            print(part.message.thinking, end='',flush=True)
            thinking+= part.message.thinking

        elif part.message.content:
            if in_thinking:
              in_thinking = False
              print('\n\nAnswer:\n', end='', flush=True)
            print(part.message.content, end='', flush=True)
            contentdata.append(part.message.content)

    new_messages = [{ "role": 'assistant', "thinking": thinking, "content": contentdata }]

    return new_messages





