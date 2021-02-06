from flask import Blueprint, jsonify, g
from decorators.check_token import check_token
from flask import request
import requests
import json

export = Blueprint("export", __name__)

services = ['spotify', 'deezer']


@export.route("/playlist", methods=['POST'])
@check_token
def _connected():
    if request.json['service'] == 2:
        r = requests.get('https://api.deezer.com/playlist/' +
                         str(request.json['playlist_id']) + '?access_token=' + g.user.deezer["token"])
        data = r.json()
        musics = data["tracks"]['data']
        name = data['title']
        try:
            headers = {'Authorization': 'Bearer ' +
                       g.user.spotify["access_token"],
                       "Content-Type": "application/json",
                       "Accept": "application/json"}
        except:
            return {"Error": "Not connected to another platform"}, 400
        r = requests.get("https://api.spotify.com/v1/me", headers=headers)
        user_id = r.json()['id']
        _data = {"name": name, "description": "",
                 "public": False}
        r = requests.post('https://api.spotify.com/v1/users/' +
                          user_id + '/playlists', data=json.dumps(_data), headers=headers)
        playlist_id = r.json()['id']
        uris = []
        for i, music in enumerate(musics):
            r = requests.get('https://api.spotify.com/v1/search?q=' + music['title'] + "%20artist:" + music['artist']['name']
                             + '&type=track&limit=1', headers=headers)
            try:
                uris.append(r.json()['tracks']['items'][0]['uri'])
            except:
                continue
        requests.post("https://api.spotify.com/v1/playlists/" + playlist_id +
                      "/tracks", data=json.dumps({'uris': uris}), headers=headers)
    else:
        headers = {'Authorization': 'Bearer ' +
                   g.user.spotify["access_token"],
                   "Content-Type": "application/json",
                   "Accept": "application/json"}
        r = requests.get('https://api.spotify.com/v1/playlists/' +
                         str(request.json['playlist_id']), headers=headers)
        name = r.json()['name']
        musics = r.json()['tracks']['items']
        headers = {"Content-Type": "application/json",
                   "Accept": "application/json"}
        try:
            r = requests.post("https://api.deezer.com/user/me/playlists" +
                              '?access_token=' + g.user.deezer["token"] + "&title=" + name, headers=headers)
            playlist_id = r.json()['id']
        except:
            return {"Error": "Not connected to another service"}, 400
        for music in musics:
            r = requests.get(
                'https://api.deezer.com/search?q=artist:\"' + music['track']['album']['artists'][0]['name'] + '\" track:\"' + music['track']['name'] + '\"')
            try:
                r = requests.post("https://api.deezer.com/playlist/" + str(playlist_id) + "/tracks" +
                                  '?access_token=' + g.user.deezer["token"] + "&songs=" + str(r.json()['data'][0]['id']), headers=headers)
            except:
                continue
    return jsonify({"status": "ok"})
