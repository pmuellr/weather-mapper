weather-mapper
================================================================================



running locally
================================================================================

* run `git clone` to get the code
* run `cd` to change directory into the code
* run `npm install` to install node dependencies
* run `npm start` to start the application
* in a browser, visit the URL printed to the console when the application starts



running on Cloud Foundry
================================================================================

* copy `manifest-sample.yml` to `manifest.yml`
* edit `manifest.yml`, change the `host` property to something unique
* run `cf push`
* shortly after the `cf push` starts, open a new terminal and run
  `cf logs weather-mapper`
* in a browser, visit the URL printed to the console when the application starts

Same browser window as when running locally.



hacking
================================================================================

If you want to modify the source to play with it, you'll also want to have the
`jbuild` program installed.

To install `jbuild` on Windows, use the command

    npm -g install jbuild

To install `jbuild` on Mac or Linux, use the command

    sudo npm -g install jbuild

The `jbuild` command runs tasks defined in the `jbuild.coffee` file.  The
task you will most likely use is `watch`, which you can run with the
command:

    jbuild watch

When you run this command, the application will be built from source, the server
started, and tests run, etc.  When you subsequently edit and then save one of
the source files, the application will be re-built, the server re-started, and
the tests re-run.  For ever.  Use Ctrl-C to exit the `jbuild watch` loop.

You can run those build, server, and test tasks separately.  Run `jbuild`
with no arguments to see what tasks are available, along with a short
description of them.



license
================================================================================

Apache License, Version 2.0

<http://www.apache.org/licenses/LICENSE-2.0.html>

<!-- ================ -->
