#docker build -t dawa_ws_image:latest .

FROM python_base:latest
RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    tzdata
WORKDIR /app/api_web2p/api_web2p
COPY . /app/api_web2p/api_web2p
RUN pip3 --no-cache-dir install -r src/utils/requerimientos.txt
EXPOSE 5000
CMD ["python3", "app.py"]