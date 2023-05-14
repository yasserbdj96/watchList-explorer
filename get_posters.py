#!/usr/bin/env python
# coding:utf-8
#   |                                                          |
# --+----------------------------------------------------------+--
#   |   Code by : yasserbdj96                                  |
#   |   Email   : yasser.bdj96@gmail.com                       |
#   |   Github  : https://github.com/yasserbdj96               |
#   |   BTC     : bc1q2dks8w8uurca5xmfwv4jwl7upehyjjakr3xga9   |
# --+----------------------------------------------------------+--  
#   |        all posts #yasserbdj96 ,all views my own.         |
# --+----------------------------------------------------------+--
#   |                                                          |

#START{
from imbot import *
import json
import requests
import os
import sys
#from os.path import exists

#
data_file='./src/my_list.json'
steps_file='./src/google.json'

# Opening JSON file
f = open(data_file)
  
# returns JSON object as 
# a dictionary
data = json.load(f)

temp="./temp/"
if data["temp"]=="true":
    if not os.path.exists(temp):
        os.makedirs(temp)

try:
    if sys.argv[1]=="-d":
        if not os.path.exists(temp):
            os.makedirs(temp)
        types=["series","movies"]
        for j in range(len(types)):
            for i in range(len(data[types[j]])):
                if not os.path.exists(temp+data[types[j]][i]['name']+".jpg"):
                    with open(temp+data[types[j]][i]['name']+".jpg", 'wb') as handle:
                        response = requests.get(data[types[j]][i]['poster_url'], stream=True)
                        if not response.ok:
                            print(response)
                        for block in response.iter_content(1024):
                            if not block:
                                break
                            handle.write(block)
                    #print(f"The image has been downloaded from the link {data[types[j]][i]['poster_url']} in the path {temp+data[types[j]][i]['name']+'.jpg'}")
except:
    pass

def get_poster(opt,steps_file,data_file,temp,headlessis=True):
    # :
    x=True
    for i in range(len(data[opt])):
        if data[opt][i]['poster_url']=="":# or (data["temp"]=="true" and not os.path.exists(temp+data[opt][i]['name']+".jpg")):
            if x==True:
                p1=imbot(steps_file,headless=headlessis,sleep_time=0.01,exec_path="chromedriver")
                x=False

            ms_name=data[opt][i]['name']
            ms_type=data[opt][i]['type']
            ms_country=data[opt][i]['country']
            ms_year=data[opt][i]['year']

            search=ms_name.replace("."," ")+f" {ms_year} {ms_country} {ms_type} poster imdb"
            s = search
            words = s.split()
            result = ""
            for g in range(len(words)):
                if g == 0:
                    result += words[g]
                else:
                    result += " " + words[g]
            search=result
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

            if data["temp"]=="true" and not os.path.exists(temp+data[opt][i]['name']+".jpg"):
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


try:
    headlessis=sys.argv[1]
    get_poster("series",steps_file,data_file,temp,headlessis)
    get_poster("movies",steps_file,data_file,temp,headlessis)
except:
    get_poster("series",steps_file,data_file,temp)
    get_poster("movies",steps_file,data_file,temp)

# Closing file
f.close()
#}END.