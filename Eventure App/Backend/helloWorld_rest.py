from flask import Flask
import urllib3, requests, json
import pymongo
import json
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.after_request 
def after_request(response): 
	response.headers.add('Access-Control-Allow-Credentials', 'false') 
	response.headers.add('Access-Control-Allow-Origin', '*') 
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization') 
	response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS') 
	return response


@app.route("/sayHello", methods = ['GET'])
def hello():
    return "Hello World! able to run py"

@app.route("/viewPrediction")
def getUserAndEventNamesFromDb():
	MONGODB_URI = "mongodb://root:root123@ds141697.mlab.com:41697/eventure"
	client = MongoClient(MONGODB_URI, connectTimeoutMS=30000)
	eventureDB = client["eventure"]
	usersCollection = eventureDB["users"]
	eventsCollection = eventureDB["events"]

	pastEventsList = []

	for doc in usersCollection.find({},{"_id" : 0}): #exclude id fields as they're causing error  
		stringData = json.dumps(doc)
		dictData = json.loads(stringData)
	for key, value in dictData.items():
	   # if(key == "emailid"):
	    print(key, " : ", value)
	    if(key == 'pastevents'):
	        sublist = value.split(",")
	        for eventId in sublist:
	            pastEventsList.append(eventId)

	# print(doc)

	#myQuery = {"_id" : {"$oid" : "5bfcb5849f7db3c396ea0668"}}
	#eventDoc = eventsCollection.find(myQuery)

	print("contents of past events list: ")
	            
	for item in pastEventsList:
	# for item1 in item
		query = {"eventname" : "A"}
		eventDoc = eventsCollection.find(query)

	for e in eventDoc:
		print(e)


def callPredict():
	print("in callPredict")
	predictionResult = predict("avi", "nano", 5, 0.05)
	resultList = predictionResult.split(",")
	if(resultList[0] == "1.0"):
		return "nano"
	return resultList[0] + ", " + resultList[1]

def predict(user_name, event_name, proximity, relevance):
	wml_credentials={
		"url": "https://us-south.ml.cloud.ibm.com",
		"username": "20a80a82-58d7-4b8f-9dd4-7d23fbb49275",
		"password": "62b29ff3-4477-40ca-9254-f225557aac69"
	}

	headers = urllib3.util.make_headers(basic_auth='{username}:{password}'.format(username=wml_credentials['username'], password=wml_credentials['password']))
	url = '{}/v3/identity/token'.format(wml_credentials['url'])
	response = requests.get(url, headers=headers)
	mltoken = json.loads(response.text).get('token')

	header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}

	# NOTE: manually define and pass the array(s) of values to be scored in the next line
	payload_scoring = {"fields": ["user_name", "event_name", "proximity", "relevance"], "values": [[user_name, event_name, proximity, relevance ]]}

	response_scoring = requests.post('https://us-south.ml.cloud.ibm.com/v3/wml_instances/644bd708-544f-48e9-8bae-d9d3974e2a83/deployments/c150a3ba-a2ef-4643-9f4c-3680671e1a9f/online', json=payload_scoring, headers=header)
	print("Scoring response")

	dictionary = json.loads(response_scoring.text)
	for key, val in dictionary.items():
		print(key)
		if(key == 'values'):
			print("val 1: ", val[0][6])
			print("val: ", val[0][7])
	#return json.dumps(response_scoring.text)
	return str(val[0][7]) + ',  ' + str(val[0][6][1])
'''	dictData = json.loads(response_scoring.text)
	for key,value in dictData.items():
    	#print(key, " : ", value)
        if(key == 'prediction'):
        	print(value)'''
  #  return json.dumps((json.loads(response_scoring.text)))


if __name__ == '__main__':
    app.run(debug=True)
