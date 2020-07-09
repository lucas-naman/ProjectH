# PROJECT M Auth Service

> Rest API AUTH Service 

## Quick Start Using Venv

``` bash
# Create a Google Cloud Project
https://cloud.google.com/appengine/docs/standard/python3/building-app/creating-gcp-project

# Connect SDK To Google to access DataBase
$ gcloud auth application-default login

# Create an isolated Python environment in a directory external to your project and activate it:
$ python3 -m venv env
$ source env/bin/activate

# Install dependencies
$ pip install  -r requirements.txt

# Run Server (http://localhost:8080)
python auth-service.py
```

## Deploy On Google App Engine

``` bash
# Create a Google Cloud Project
https://cloud.google.com/appengine/docs/standard/python3/building-app/creating-gcp-project

# Connect SDK To Google 
$ gcloud auth application-default login

# Deploy App
$ gcloud app deploy auth-service.yaml

# Go To Url
$ gcloud app browse

```

## Endpoints

* GET     /