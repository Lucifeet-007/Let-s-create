from flask import Flask, request, jsonify, render_template, redirect, url_for, session
import random
import json

app = Flask(__name__)
app.secret_key = 'supersecretkey'

# Simulated database
users = {}
meetings = []

def send_otp(mobile, email):
    otp = random.randint(100000, 999999)
    session['otp'] = otp
    # Simulate sending OTP
    print(f'OTP sent to {mobile} and {email}: {otp}')
    return otp

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']
    email = data['email']
    mobile = data['mobile']
    users[username] = {'password': password, 'email': email, 'mobile': mobile}
    send_otp(mobile, email)
    return jsonify({'message': 'OTP sent to your mobile and email.'})

@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    entered_otp = request.json['otp']
    if entered_otp == str(session.get('otp')):
        return jsonify({'message': 'OTP verified successfully.'})
    else:
        return jsonify({'message': 'Invalid OTP.'}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    user = users.get(username)
    if user and user['password'] == password:
        session['user'] = username
        return jsonify({'message': 'Login successful.'})
    else:
        return jsonify({'message': 'Invalid username or password.'}), 400

@app.route('/book_meeting', methods=['POST'])
def book_meeting():
    if 'user' not in session:
        return jsonify({'message': 'Unauthorized'}), 401
    data = request.json
    meeting = {
        'topic': data['topic'],
        'date': data['date'],
        'time': data['time'],
        'user': session['user'],
        'mobile': users[session['user']]['mobile']
    }
    meetings.append(meeting)
    return jsonify({'message': 'Meeting booked successfully.'})

@app.route('/get_meetings', methods=['GET'])
def get_meetings():
    if 'user' not in session:
        return jsonify({'message': 'Unauthorized'}), 401
    user = session['user']
    user_meetings = [meeting for meeting in meetings if meeting['user'] == user or user == 'mainhead']
    return jsonify(user_meetings)

if __name__ == '__main__':
    app.run(debug=True)