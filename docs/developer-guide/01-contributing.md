# Contributing to Azul
Want to contribute? Thanks and welcome! Reading all the documentation is a great place to start before you begin.


## Development Principles and Philosophy
Azul is a highly scalable, automated malware analysis solution and knowledge store. The Azul team aim to provide an
extensible framework that allows analysts to trivially automate their analysis and interrogate historic results.


In general:

* Azul is largely written in Python, therefore, Python best practices should be adhered to. Refer to
  [PEP 8](https://www.python.org/dev/peps/pep-0008/).
* Keep things clean, simple, consistent and readable.
* Tests! Everything should have test code.
* Meaningful documentation.
  Use [google style](https://google.github.io/styleguide/pyguide.html#s3.8-comments-and-docstrings).
  See [example](https://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html).


Azul is split across many separate repositories to simplify management. For more specific details, please refer to that
subsection of the documentation.

The Azul team welcome all bug reports and new feature requests on our issue tracker. Pull requests are always welcome too!


### Submitting A Pull Request
Before submitting a pull request for your changes, please follow these guidelines:

1. Test should be included.
2. If you are adding functionality, documentation should be updated/included.
3. Your contribution should work on Python 3.9+


## Plugin Development
A plugin performs some form of work on an entity and saves its results. Plugins perform the majority of the analysis
within Azul and are intended to be the primary method through which new analytical techniques are added to the system.

In short, all common input and output requirements of a plugin are provided by the framework. All the developer needs
to do is obtain the information needed to perform their analysis, perform their analysis, and then save the desired
results.

For a detailed guide please see [plugin development guide](./components/core/runner/docs/index.md)
