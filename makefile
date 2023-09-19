
install:
	npm install
	cd frontend && npm install
	cd backend && npm install

build-fe:
	npm run build:fe

build-be:
	npm run build:be

copy-install-be:
	mkdir output/build
	cp -R backend/dist output/build/dist
	cp -R backend/node_modules output/build/node_modules
	cp backend/.env output/build/.env
	cp backend/package.json output/build/package.json
	# cd output/build && npm install

delete-dist:
	rm -rf output

build: delete-dist build-fe build-be copy-install-be

dev:
	npm run dev

