.PHONY: test

all:
	yarn install

test:
	yarn test
	yarn lint