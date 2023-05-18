from flask import Flask, request, render_template
from imbot import *

app = Flask(__name__)

def get_poster(p1, m_s_name, type, country, year):
    search = m_s_name
    if year and year != "None":  # Check if year is not None and not "None" string
        search += " " + str(year)
    if country and country != "None":  # Check if country is not None and not "None" string
        search += " " + country
    search += f" {type} poster imdb"
    poster = p1.run("search", get_this=search)[0]
    if "jpeg" in poster or "webp" in poster or "data:image/" in poster:
        poster = p1.run("search2", get_this=search)[0]
    return poster

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_poster', methods=['POST'])
def check_poster():
    m_s_name = request.form.get('m_s_name')
    type = request.form.get('type')
    country = request.form.get('country')
    year = request.form.get('year')
    poster = get_poster(p1, m_s_name, type, country, year)
    return poster

if __name__ == '__main__':
    p1 = imbot('./google.json', headless=True, sleep_time=0.01, exec_path="chromedriver")
    app.run(debug=True)
    p1.end()

