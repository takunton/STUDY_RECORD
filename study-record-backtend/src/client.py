import requests

res = requests.get("http://127.0.0.1:8000/record")
# res = requests.get("http://127.0.0.1:8000/learning-content")

print(res.status_code)
print(res.text)
