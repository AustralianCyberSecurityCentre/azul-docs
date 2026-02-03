# Azul Plugin Suricata

Executes Suricata/Snort rules against packets in a Packet Capture file.

## Development Installation

To install azul-plugin-suricata for development run the command
(from the root directory of this project):

```bash
pip install -e .
```

## Usage

Usage on local files:

```bash
$ azul-plugin-suricata malware.file
... example output goes here ...
```

Check `azul-plugin-suricata --help` for advanced usage.

## Python Package management

This python package is managed using a `pyproject.toml` file.

Standardisation of installing and testing the python package is handled through tox.
Tox commands include:

```bash
# Run all standard tox actions
tox
# Run linting only
tox -e style
# Run tests only
tox -e test
```

## Dependency management

Dependencies are managed in the requirements.txt, requirements_test.txt and debian.txt file.

The requirements files are the python package dependencies for normal use and specific ones for tests
(e.g pytest, black, flake8 are test only dependencies).

The debian.txt file manages the debian dependencies that need to be installed on development systems and docker images.

Sometimes the debian.txt file is insufficient and in this case the Dockerfile may need to be modified directly to
install complex dependencies.

## Upgrading suricata for local dev

If test cases for this repo are failing it's likely due to the version of suricata you are running.
For example Ubuntu 24.04 runs an older version of suricata compared to debian 13.

To rectify this issue you can build suricata from source, to do that use the script `install-suricata-from-tar.sh`
