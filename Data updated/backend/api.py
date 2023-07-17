from flask import Flask, jsonify
from script import scrape_jobs
from apscheduler.schedulers.background import BackgroundScheduler
import csv
from datetime import datetime
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)

filename = 'job_data.csv'


@app.route('/other_data', methods=['GET'])
def other_data():
    website = "https://dailyremote.com"
    current_date = datetime.now().strftime("%Y-%m-%d")
    file= 'Job Data'
    data = {
        "filename": file,
        "date": current_date,
        "website": website
    }
    return jsonify(data)


@app.route('/latest_jobs', methods=['GET'])
def jobs():
    try:
        job_data = read_csv_file()

        current_date = datetime.now().strftime("%Y-%m-%d")
        data = {
            "date": current_date,
            "job_data": job_data
        }
        return jsonify(data)
    
    except Exception as e:
        print(e)
        return jsonify({"error": "No data found"})


def read_csv_file():
    with open(filename, mode='r') as file:
        csv_reader = csv.DictReader(file)
        job_data = list(csv_reader)
    return job_data


scheduler = BackgroundScheduler()
scheduler.add_job(scrape_jobs, 'interval', days=3, next_run_time=datetime.now())
scheduler.start()

if __name__ == '__main__':
    app.run(port=5003,host='0.0.0.0')
