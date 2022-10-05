import requests
import datetime
from flask import Flask
app = Flask(__name__)

url = 'https://services.data.shom.fr/b2q8lrcdl4s04cbabsj4nhcb/hdm/spm/hlt?'

harborName = 'LA_ROCHELLE-PALLICE'
duration = '7'

# Date au format YYYY-MM-DD
date = datetime.date.today().strftime('%Y-%m-%d')
utc = 'standard'
correlation = '1'

def buildUrl():
  return url + 'harborName=' + harborName + '&duration=' + duration + '&date=' + date + '&utc=' + utc + '&correlation=' + correlation


@app.route('/')
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