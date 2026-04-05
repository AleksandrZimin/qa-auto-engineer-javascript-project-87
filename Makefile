install: deps-install
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10

deps-install:
	npm ci

deps-update:
	npx ncu -u

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

gendiff:
	node bin/gendiff.js -h  

test:
	npm test

.PHONY: test