BASE_URL ?= https://dev.dagit.club
HEADLESS ?= true
IDENTITY ?= ''
IDENTITY2 ?= ''
ADDRESS ?= z4sgf-tgypl-idfay-yidkk-zyxsd-4vnko-pn4rn-pvqg7-wqu27-txgvf-cae
LATENCY ?= 500
LONGLATENCY ?= 3000
SIGNATURE ?= $(shell date +%s)
PR_FLAG ?= 

BUILD_ENV ?= BASE_URL=$(BASE_URL) HEADLESS=$(HEADLESS) IDENTITY=$(IDENTITY) LATENCY=$(LATENCY) ADDRESS=$(ADDRESS) SIGNATURE=$(SIGNATURE) IDENTITY2=$(IDENTITY2)

node_modules:
	npm install

test: node_modules
	$(BUILD_ENV) npx playwright test $(PR_FLAG)

