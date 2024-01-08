import requests
import json
url_get = "https://us-east-1.aws.data.mongodb-api.com/app/data-vplka/endpoint/data/v1/action/find"
url_create = "https://us-east-1.aws.data.mongodb-api.com/app/data-vplka/endpoint/data/v1/action/insertOne"
url_delete = "https://us-east-1.aws.data.mongodb-api.com/app/data-vplka/endpoint/data/v1/action/deleteOne"


create_json = {
    "collection": "Conditions",
    "database": "Testing",
    "dataSource": "TestingDB",
    "document": {
        "name": "John Sample",
        "age": 42
      }
}

get_json = {
    "collection": "Conditions",
    "database": "Testing",
    "dataSource": "TestingDB",
    "filter": { 
        # "column1": "CustomerNumber"
    }
}

delete_json = {
    "collection": "Conditions",
    "database": "Testing",
    "dataSource": "TestingDB",
    "document": {
        "name": "John Sample",
        "age": 42
      }
}

payload = json.dumps(get_json)

headers = {
  'Content-Type': 'application/json',
  'Access-Control-Request-Headers': '*',
  'api-key': "AFDSUypfm5wMdJ8Y8MdgEX3dSFCkFjqxVNisw1gAjQbsazxNCOKVT4fXXNB5R2UB", 
}

response = requests.request("POST", url_get, headers=headers, data=payload)

print(response.text)
