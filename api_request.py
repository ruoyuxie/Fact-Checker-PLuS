import requests

# Get input params
API_KEY = "AIzaSyA7FGpJIKd1p0lleUbwmm_9v7yic031pBk"
query = input("Enter search phrase:")

# Set up request
myparams = {
    "key": API_KEY,
    "query": query
}
proxies = {
    "http": "http://127.0.0.1:51388",
    "https": "http://127.0.0.1:51388"
}
url = 'https://factchecktools.googleapis.com/v1alpha1/claims:search'
# Make request
r = requests.get(
    url, params=myparams, proxies=proxies, timeout=5)
print(r.url)

# Store response as a json file
with open("query-results.json", "w", encoding="utf-8") as f:
    f.write(r.text)
