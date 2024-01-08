import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "http://example.com"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.content, "html.parser")

# Find specific elements on the webpage
title = soup.title.text
paragraphs = soup.find_all("p")

# Print the results
print("Title:", title)
print("Paragraphs:")
for paragraph in paragraphs:
    print(paragraph.text)