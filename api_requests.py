import requests

# Get input params
API_KEY = input("Enter API key:")
query = input("Enter search phrase:")

# Set up request
myparams = {
    "key": API_KEY,
    "query": query
}
url = 'https://factchecktools.googleapis.com/v1alpha1/claims:search'
# Make request
r = requests.get(
    url, params=myparams, timeout=5)

# Store response as a json file
with open("query-results.json", "w", encoding="utf-8") as f:
    f.write(r.text)
