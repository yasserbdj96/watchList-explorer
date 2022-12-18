#!/usr/bin/env python
# coding:utf-8
from imbot import *
import json
import requests
import os
#from os.path import exists

temp="./temp/"
if not os.path.exists(temp):
    os.makedirs(temp)

#
data_file='./src/my_list.json'

# Opening JSON file
f = open(data_file)
  
# returns JSON object as 
# a dictionary
data = json.load(f)

def get_poster(opt,data_file,temp):
    # :
    x=True
    for i in range(len(data[opt])):
        if data[opt][i]['poster_url']=="" or (data["temp"]=="true" and not os.path.exists(temp+data[opt][i]['name']+".jpg")):
            if x==True:
                p1=imbot("./src/google.json",headless=True,sleep_time=0.01,exec_path="chromium.sh")
                x=False

            ms_name=data[opt][i]['name']
            ms_type=data[opt][i]['type']
            ms_country=data[opt][i]['country']
            ms_year=data[opt][i]['year']

            search=ms_name.replace("."," ")+f" {ms_year} {ms_country} {ms_type} poster imdb"
            poster=p1.run("search",get_this=search)[0]

            if "jpeg" in poster or "webp" in poster or "data:image/" in poster:
                poster=p1.run("search2",get_this=search)[0]


            postertype=poster.split(".")
            postertype="."+postertype[len(postertype)-1]
            postertype=postertype.lower()

            try:
                postertype=postertype.split("?")[0]
            except:
                pass
            try:
                postertype=postertype.split(":")[0]
            except:
                pass

            if postertype!=".jpg" and postertype!=".png":
                postertype="jpg"

            if data["temp"]=="true":
                if not os.path.exists(temp+ms_name+postertype):
                    r = requests.get(poster)
                    with open(temp+ms_name+postertype, 'wb') as outfile:
                        outfile.write(r.content)

            data[opt][i]['poster_url']=poster

            # Writing to sample.json
            with open(data_file,"w+") as outfile:
                json.dump(data,outfile, indent=4)
    if x==False:
        p1.end()

get_poster("series",data_file,temp)
get_poster("movies",data_file,temp)

# Closing file
f.close()
