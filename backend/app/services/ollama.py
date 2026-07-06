import os
from ollama import Client
from fastapi.responses import StreamingResponse

OLLAMA_API_KEY="a976094197904a95ada017c8b2ea12f0.0HKTva-Ay2vbTKELeSepncO1"

client = Client(
    host="https://ollama.com",
    headers={'Authorization': 'Bearer ' + OLLAMA_API_KEY}
)


# messages = [
#   {
#     'role': 'user',
#     'content': 'Why is the sky blue?',
#   },
# ]

async def generateSummary(data):
    in_thinking = False
    content = ''
    thinking = ''
    contentdata = []
    messages = [
      {
        'role':"system",
        'content':"You are an expert technical reviewer summarizing job candidates for a hiring team. never give the result on coding format or programing lang"
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





