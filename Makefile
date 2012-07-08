# $@ = all arguments. args are a list of directive/filter folder names
# Example usage: 'make modules/directives/date modules/filters/length'

JS_FILES = $(shell find $@ -type f -path '*/src/*.js')
COFFEE_FILES = $(shell find $@ -type f -name '*.coffee')

all: build

coffee:
	coffee -c ${COFFEE_FILES}

js: coffee
	cat common/src/*.js ${JS_SRC_FILES} > build/angular-ui.js
	uglifyjs -o build/angular-ui.min.js --no-mangle --no-squeeze build/angular-ui.js
	
css:
	lessc common/stylesheets/angular-ui.less build/angular-ui.css
	lessc common/stylesheets/angular-ui.less build/angular-ui.min.css -compress
		
build: js css

.PHONY: coffee js css build