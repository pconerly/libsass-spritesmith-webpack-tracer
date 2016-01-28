clean:
	rm -rf ./build && rm -rf ./static/spritesmith-generated


test:
	make clean && npm run webpack-dev
