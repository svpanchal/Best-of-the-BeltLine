#!/bin/bash

http localhost:3000

http localhost:3000/events
http localhost:3000/events/new
http localhost:3000/events/2
http localhost:3000/events/2/edit
http -f POST localhost:3000/events
http PUT localhost:3000/events/2
http DELETE localhost:3000/events/2
