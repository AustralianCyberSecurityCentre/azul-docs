# Documentation

Obviously code documentation belongs alongside code.

Any other Azul documentation has 3 potential locations based on what that document contains.

* specific to single repository
  * i.e. class diagram of Azul Dispatcher
  * store diagram in that repository
  * store diagram as raw markdown in mermaid format
  * has to be an *.md file either at root of repo or somewhere under a `docs` folder in  root of repo
* involve multiple repositories but generic to all environments
  * i.e. communication diagram between Azul components
  * store diagram directly in azul-docs
  * store diagram as raw markdown in mermaid format
  * do not put docs under the automated copies of single repo documentation as they will be deleted - this includes `docs/core` & `docs/plugins`.
* involve specific deployment environment information
  * i.e. diagram of data feeds to/from Azul and other concrete services
  * where it makes sense, create an abstract diagram and place in azul-docs as well
  * mermaid is not a hard requirement
  * if you store a prerendered diagram (jpg,png), must also have the up-to-date source file stored!

This is a rule of thumb rather than a hard requirement, 
so if it doesn't make sense for your situation, just justify why
you did something different.

## Key reasons for using this solution

* for single repo documentation, pipelines will auto copy *.md files into the
    azul-docs project in a dedicated folder per repository.
  * this is currently only true for Azul repositories
* the azul-docs project will auto render mermaid format into svgs in the web app
* diagrams - markdown make it possible to resolve merge conflicts
* diagrams - no extra files to manage in each repo
