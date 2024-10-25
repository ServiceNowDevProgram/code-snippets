import argparse
import pprint
import requests
import datetime
import matplotlib.dates as mdates
import pandas as pd
import matplotlib.pyplot as plt
import urllib.request
import urllib.parse
import json
import datetime
from pytz import timezone

# ---- #
# init #
# ---- #
point_dict = {}
total_points = 0
done = 0
undone = 0
parser = argparse.ArgumentParser()
parser.add_argument('instancename')
parser.add_argument('authstring')
parser.add_argument('sprintname')
args = parser.parse_args()
BASIC = 'Basic ' + args.authstring

# ---------- #
# Get Sprint #
# ---------- #
params = {
    'sysparm_query': 'short_description=' + args.sprintname
}
param = urllib.parse.urlencode(params)
url = "https://" + args.instancename + ".service-now.com/api/now/table/rm_sprint?" + param
req = urllib.request.Request(url)
req.add_header("authorization", BASIC)
with urllib.request.urlopen(req) as res:
    r = res.read().decode("utf-8")
obj = json.loads(r)
# Get the start and end dates of a Sprint
start_date = obj['result'][0]['start_date']
start_date = (datetime.datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S') + datetime.timedelta(hours=9)).date()
print(start_date)
end_date = obj['result'][0]['end_date']
end_date = (datetime.datetime.strptime(end_date, '%Y-%m-%d %H:%M:%S') + datetime.timedelta(hours=9)).date()
# Initializing the points array
while start_date <= end_date:
    point_dict[str(start_date)] = 0
    start_date = start_date + datetime.timedelta(days=1)
# --------- #
# Get Story #
# --------- #
params = {
    'sysparm_query': 'sprint.short_descriptionLIKE' + args.sprintname
}
param = urllib.parse.urlencode(params)
url = "https://" + args.instancename + ".service-now.com/api/now/table/rm_story?" + param
req = urllib.request.Request(url)
req.add_header("authorization", BASIC)
with urllib.request.urlopen(req) as res:
    r = res.read().decode("utf-8")
obj = json.loads(r)
# Story Loop
for name in obj['result']:
    if len(name['story_points']) > 0:
        total_points += int(name['story_points'])
        if name['closed_at'] != '':
            close_date = datetime.datetime.strptime(
                name['closed_at'], '%Y-%m-%d %H:%M:%S')
            close_date = close_date.date()
            if name['state'] == '3':
                if str(close_date) in point_dict:
                    point_dict[str(close_date)] += int(name['story_points'])
                else:
                    point_dict[str(close_date)] = int(name['story_points'])
        if name['state'] == '3':
            done += int(name['story_points'])
        else:
            undone += int(name['story_points'])
counta = 0
for i in point_dict.items():
    counta += int(i[1])
    point_dict[i[0]] = total_points - counta
plt.xkcd()
fig, ax = plt.subplots()
# Creating a performance line
x = []
y = []
plt.ylim(0, total_points + 5)
counta = 0
for key in point_dict.keys():
    if datetime.datetime.today() >= datetime.datetime.strptime(key, '%Y-%m-%d'):
        x.append(datetime.datetime.strptime(key, '%Y-%m-%d'))
        y.append(point_dict[key])
# Holiday determination
DATE = "yyyymmdd"
def isBizDay(DATE):
    Date = datetime.date(int(DATE[0:4]), int(DATE[4:6]), int(DATE[6:8]))
    if Date.weekday() >= 5:
        return 0
    else:
        return 1
# Get the number of weekdays
total_BizDay = 0
for key in point_dict.keys():
    if isBizDay(key.replace('-', '')) == 1:
        total_BizDay += 1
# Creating an ideal line
x2 = []
y2 = []
point_dict_len = len(point_dict)
average = total_points / (total_BizDay - 1)
for key in point_dict.keys():
    dtm = datetime.datetime.strptime(key, '%Y-%m-%d')
    x2.append(dtm)
    y2.append(total_points)
    # If the next day is a weekday, consume the ideal line.
    if isBizDay((dtm + datetime.timedelta(days=1)).strftime("%Y%m%d")) == 1:
        total_points -= average
days = mdates.DayLocator()
daysFmt = mdates.DateFormatter('%m/%d')
ax.xaxis.set_major_locator(days)
ax.xaxis.set_major_formatter(daysFmt)
plt.title("" + args.sprintname + " Burndown")
plt.plot(x2, y2, label="Ideal", color='green')
plt.plot(x2, y2, marker='.', markersize=20, color='green')
plt.plot(x, y, label="Actual", color='red')
plt.plot(x, y, marker='.', markersize=20, color='red')
plt.grid()
plt.xlabel("Days")
plt.ylabel("Remaining Effort(pts)")
plt.subplots_adjust(bottom=0.2)
plt.legend()
# Viewing the graph
# plt.show()
# Saving a graph
plt.savefig('figure.png')
