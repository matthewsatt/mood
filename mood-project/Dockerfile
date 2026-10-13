FROM node:12 AS build-stage

WORKDIR /react-app

# Install dependencies first so they stay cached between code changes
COPY react-app/package.json react-app/package-lock.json ./
RUN npm ci

# Build our React App
COPY react-app/. .
RUN npm run build

FROM python:3.9

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production

EXPOSE 8000

WORKDIR /var/www

# Install Python Dependencies first so they stay cached between code changes
COPY requirements.txt .
RUN pip install -r requirements.txt psycopg2==2.9.12

COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Run flask environment
CMD gunicorn app:app
