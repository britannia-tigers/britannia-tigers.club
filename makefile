
install:
	npm install
	cd frontend && npm install
	cd backend && npm install

build-fe:
	npm run build:fe

build-be:
	npm run build:be

copy-be:
	cp -r backend/node_modules dist/build/node_modules
	cp backend/package.json dist/build/package.json

build: build-fe build-be copy-be

dev:
	npm run dev

