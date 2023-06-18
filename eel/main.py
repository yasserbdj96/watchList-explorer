import eel
import os
from imbot import *

# Set web files folder and optionally specify which file types to check for
eel.init(f'{os.path.dirname(os.path.realpath(__file__))}/src')

def get_poster(p1,m_s_name,type,country,year):
    search=m_s_name
    if year!="None":
        search+=" "+year
    if country!="None":
        search+=" "+country
    search+=f" {type} poster imdb"
    #print(search)
    poster=p1.run("search",get_this=search)[0]
    if "jpeg" in poster or "webp" in poster or "data:image/" in poster:
        poster=p1.run("search2",get_this=search)[0]
    return poster

@eel.expose
def check_poster(m_s_name,type,country,year):
    poster=get_poster(p1,m_s_name,type,country,year)
    return poster

@eel.expose
def read_json_file(ss=True):
    with open("../my_list.json") as file:
        data = json.load(file)
    return data

p1=imbot('../google.json',headless=True,sleep_time=0.01,exec_path="chromedriver")
host_ip="127.0.0.1"
host_port=8080
# Start the Eel app
eel.start("index.html",host=host_ip,port=host_port,mode='default')
p1.end()
