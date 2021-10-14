import requests

# Get input params
API_KEY = input("Enter API key:")
query = input("Enter search phrase:")

# Set up request
myparams = {
    "key": API_KEY,
    "query": query
}
myproxies = {
    "http": "http://127.0.0.1:50505",
    "https": "http://127.0.0.1:50505"
}
url = 'https://factchecktools.googleapis.com/v1alpha1/claims:search'
# Make request
r = requests.get(
    url, params=myparams, proxies=myproxies, timeout=5)

# Store response as a json file
with open("query-results.json", "w", encoding="utf-8") as f:
    f.write(r.text)
