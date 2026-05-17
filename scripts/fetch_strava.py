import os
import json
import urllib.request
import urllib.parse
from datetime import datetime, timezone


def api_get(url, token):
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


def refresh_token():
    data = urllib.parse.urlencode({
        "client_id": os.environ["STRAVA_CLIENT_ID"],
        "client_secret": os.environ["STRAVA_CLIENT_SECRET"],
        "refresh_token": os.environ["STRAVA_REFRESH_TOKEN"],
        "grant_type": "refresh_token",
    }).encode()
    req = urllib.request.Request(
        "https://www.strava.com/oauth/token", data=data, method="POST"
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())


tokens = refresh_token()
access_token = tokens["access_token"]

athlete = api_get("https://www.strava.com/api/v3/athlete", access_token)
athlete_id = athlete["id"]

stats = api_get(
    f"https://www.strava.com/api/v3/athletes/{athlete_id}/stats", access_token
)

activities = api_get(
    "https://www.strava.com/api/v3/athlete/activities?per_page=30", access_token
)
runs = [a for a in activities if a.get("sport_type") == "Run"][:10]

output = {
    "updated_at": datetime.now(timezone.utc).isoformat(),
    "athlete": {
        "id": athlete_id,
        "firstname": athlete.get("firstname", ""),
        "lastname": athlete.get("lastname", ""),
    },
    "stats": stats,
    "recent_runs": runs,
}

os.makedirs("assets", exist_ok=True)
with open("assets/running-data.json", "w") as f:
    json.dump(output, f, indent=2)

print(f"Done — {len(runs)} recent runs written.")
