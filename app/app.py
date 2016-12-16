import httplib2
import os
import datetime
import argparse

import pygsheets
from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
api = Api(app)

TOKEN = 'apasaveslives'


class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}


class Matchmaker(Resource):

    def __init__(self):
        super().__init__()
        self.client = pygsheets.authorize(
            outh_file='client_secret.json', outh_nonlocal=True)
        self.sheet = self.client.open_by_key(
            '1huASrSqMFRqfSgVLpq06JJxxEIRDOMOR9T_R9Vx5vXU')
        self.worksheet = self.sheet.worksheet_by_title('MMKL')
#        self.get_column_names()

    def get_column_names(self):
        header = self.worksheet.row(4)
        for i, item in enumerate(header):
            if 'matchmaker notes' in item.lower():
                self.notes = i
                return
        
    def row_to_dict(self, row):
        d = {
            'Name': row[1],
            'Notes': row[-1],
            'Scores': {
                'Dog': row[3],
                'Child': row[4],
                'Cat': row[5],
                'Home': row[6]
            },
            'Shelterluv data': row[2] != '',
            'Updated': row[0]
        }
        return d

    def get(self):
        values = self.worksheet.all_values()[4:]
        return [self.row_to_dict(row) for row in values]

        
api.add_resource(HelloWorld, '/')
api.add_resource(Matchmaker, '/mm')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)
