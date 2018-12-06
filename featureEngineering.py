

import pandas as pd
import csv

from geopy.geocoders import Nominatim
from geopy.distance import geodesic
geolocator = Nominatim(user_agent="Eventure")

from __future__ import division
import numpy as np
import math

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import collections
trainingCsvPath = "Documents/Events/finalCsvs/training.csv"
usersCsvPath = "Documents/Events/finalCsvs/users.csv"
eventsCsvPath = "Documents/Events/finalCsvs/events.csv"

#--------------------------------------------------------------------------------
# BHATTACHARYA
#--------------------------------------------------------------------------------

def compute_relevence_feature(userPastEvents, upcomingEventName, eventsCsv):

    pastEventsTfidfVector = getPastEventsTfidfVector(userPastEvents, eventsCsv)
    upcomingEventTfidfVector = getEventTfidfVector(upcomingEventName, eventsCsv)
    eventsCosineSimilarity = computeCosineSimilarity(pastEventsTfidfVector, upcomingEventTfidfVector)
    return event_similarity # 0..1


def getPastEventsTfidfVector(userPastEvents, eventsCsv):
    #past_events_ids = get_past_events_of_user(uid)
    userPastEventsList = userPastEvents.split(",")
    #print("past list: ", userPastEventsList)
    pastEventsTfidfVectorList = [getEventTfidfVector(eventName, eventsCsv) for eventName in userPastEventsList]
    pastEventsDescription = ''
    for description in pastEventsTfidfVectorList:
    	pastEventsDescription = pastEventsDescription + description
    pastEventsTfidfVector = getVector(pastEventsDescription)
    return pastEventsTfidfVector


def getEventTfidfVector(eventName_1, eventsCsv):
    #print("eventname_1: ", eventName_1)
    for eventRecord in eventsCsv.iterrows():
        eventRecord = eventRecord[1]
        eventName = eventRecord['event_name']
        if(eventName.strip().lower() == eventName_1.strip().lower()):
            eventDescription = [eventRecord['description']]
            return getVector(eventDescription)


def getVector(eventDesc):
    # create the transform
    vectorizer = TfidfVectorizer()
    # tokenize and build vocab
    vectorizer.fit(eventDesc)
    # encode document
    vector = vectorizer.transform([eventDesc[0]])
    return vector

def computeCosineSimilarity(vector_1, vector_2):
    return cosine_similarity(vector_1, vector_2)
#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------

def computeFeatures(tUserName, tEventName, usersCsvPath, eventsCsvPath):
    print("user: ", tUserName, " event: ", tEventName)
    usersCsv = pd.read_csv(usersCsvPath)
    eventsCsv = pd.read_csv(eventsCsvPath)

    for userRecord in usersCsv.iterrows():
        userRecord = userRecord[1]
        userName = userRecord['user_name']
        if(userName.lower() == tUserName.lower()):
            userLocation = userRecord['user_location']
            print("user loc: ", userLocation)
            userPastEvents = userRecord['past_event_names']
            
    for eventRecord in eventsCsv.iterrows():
        eventRecord = eventRecord[1]
        eventName = eventRecord['event_name']
        if(eventName.lower() == tEventName.lower()):
            eventLocation = eventRecord['event_location']
            print("event loc: ", eventLocation)
            #histogram
            upcomingEventName = eventName.lower()
           # print(upcomingEventDescription)
    
    #call tProximity = calculateProximity(userLocation, eventLocation)
    #call tRelevance = calculateRelevance(?,?)
    tProximity = calculateProximity(userLocation, eventLocation)
    tRelevance = calculateRelevanceBetweenCurrentAndPastEvents(upcomingEventName, userPastEvents, eventsCsv)
    print("tRelevance: ", tRelevance)
    #relevance
    featureVector = [tUserName, tEventName, tProximity, tRelevance]
    return featureVector

def calculateProximity(userLocation, eventLocation):
    uLocation = geolocator.geocode(userLocation)
    eLocation = geolocator.geocode(eventLocation)
    print("uloc: ", uLocation)
    print("eloc: ", eLocation)
    
    userLatitude = int(uLocation.latitude)
    userLongitude = int(uLocation.longitude)
    print("user lat: ", userLatitude)
    
    eventLatitude = int(eLocation.latitude)
    eventLongitude = int(eLocation.longitude)
    print("event lat: ", eventLatitude)
    
    
    userCoordinates = (userLatitude, userLongitude)
    print("user coordinates: ", userCoordinates)
    eventCoordinates = (eventLatitude, eventLongitude)
    print("event coordinates: ", eventCoordinates)
   # print("user past events", userPastEvents)

    distance = geodesic(userCoordinates, eventCoordinates).miles
    print("distance: ", distance)
    
    return distance
    
def calculateRelevanceBetweenCurrentAndPastEvents(upcomingEventName, userPastEvents, eventsCsv):
    return compute_relevence_feature(userPastEvents, upcomingEventName, eventsCsv)

def prepareDataForWatsonTraining(trainingCsvPath, usersCsvPath, eventsCsvPath):
    trainingCsv = pd.read_csv(trainingCsvPath)
    
    #create a csv file

    with open('Documents/Events/finalCsvs/testTrainingData.csv', mode='w') as testTrainingData:
        csvWriter = csv.writer(testTrainingData, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

        for trainingDataRow in trainingCsv.iterrows():
            trainingDataRow = trainingDataRow[1]
            featureVector = computeFeatures(trainingDataRow['user_name'], trainingDataRow['event_name'], usersCsvPath, eventsCsvPath)    
            csvWriter.writerow([featureVector[0], featureVector[1], featureVector[2], featureVector[3]]) #add featureVector[1] later
        
        return testTrainingData

finalTrainingData = prepareDataForWatsonTraining(trainingCsvPath, usersCsvPath, eventsCsvPath)
