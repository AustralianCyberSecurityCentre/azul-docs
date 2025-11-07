# Local CI Testing
A lot of python projects will pass tests locally but then fail in CI due to forgotten packages, bad file locations, etc.

All python projects for CI have a ./docker/ folder containing a Makefile, Dockerfile, and python.mk.

This readme is intended to get a workstation able to perform a `cd docker && make build test` to verify that the tests
will also pass in CI.

There are a few steps to this;


## run local pypi server
```
pip install pypi-server
pypi-server -p 12123 -P . -a . ./packages/
```

Put this in ~/.pypirc

```
[local]
repository: http://localhost:12123
username: blah
password: blah
```

## build and test
```
make build test
```

If there are no errors, your image is much more likely to successfully build in CI
