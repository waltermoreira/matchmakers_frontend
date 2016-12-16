FROM ubuntu:xenial

RUN apt-get update
RUN apt-get install -y unzip wget apt-transport-https
RUN apt-get install -y python3 python3-pip
RUN pip3 install --upgrade pip
RUN pip3 install virtualenv
RUN virtualenv /mmdogs
COPY app.py requirements.txt /
RUN /mmdogs/bin/pip3 install -r requirements.txt
RUN /mmdogs/bin/pip3 install https://github.com/nithinmurali/pygsheets/archive/master.zip

VOLUME /data
WORKDIR /

EXPOSE 80

CMD /mmdogs/bin/python3 app.py
