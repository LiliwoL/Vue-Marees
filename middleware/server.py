import requests
import datetime
from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


url = 'https://services.data.shom.fr/b2q8lrcdl4s04cbabsj4nhcb/hdm/spm/hlt?'

harborName = 'LA_ROCHELLE-PALLICE'
duration = '7'

# Date au format YYYY-MM-DD
date = datetime.date.today().strftime('%Y-%m-%d')
utc = 'standard'
correlation = '1'

# Méthode pour construire l'url d'appel auprès de shom.fr
def buildUrl():
  return url + 'harborName=' + harborName + '&duration=' + duration + '&date=' + date + '&utc=' + utc + '&correlation=' + correlation

# Route principale pour avoir les horaires
# ############################################
@app.route('/')
@cross_origin()
def getTideData():
  headers = {
    "Content-Type": "application/json; charset=utf-8",
    'Referer': 'https://maree.shom.fr/',
    'Cache-Control' : 'no-cache',
  }

  r = requests.get(
		buildUrl(),
		headers=headers
	)

  return r.json()


if __name__ == '__main__':
    app.run()