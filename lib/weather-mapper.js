// Licensed under the Apache License. See footer for details.

fs            = require("fs")
url           = require("url")
child_process = require("child_process")

_      = require("underscore")
hapi   = require("hapi")
cfenv  = require("cfenv")

utils     = require("./utils")
server    = require("./server")
getOpts   = require("./getOpts")

//------------------------------------------------------------------------------
utils.exportFunctions(exports, [
  main,
])

//------------------------------------------------------------------------------
function main(cliArgs) {
  utils.setProgramName(__filename)

  process.on("uncaughtException", function(err) {
    if (err.stack)
      utils.log(err.stack)
    else
      utils.log("uncaught exception: " + err)
  })

  var optsSpec = {
    port:        [ "p", Number ],
    verbose:     [ "v", Boolean ],
    help:        [ "h", Boolean ],
  }

  var cli = getOpts.parse(args, optsSpec)

  var envOpts = getEnvOpts()
  var cfOpts  = getCfOpts()
  var defOpts = getDefOpts()

  var opts = _.defaults(cli.opts, envOpts, cfOpts)

  utils.vlog("opts: ", utils.JL(opts))

  server.start(opts)
}

//------------------------------------------------------------------------------
function getDefOpts() {
  var result = {}

  return result
}

//------------------------------------------------------------------------------
function getEnvOpts() {
  var result = {}

  return result
}

//------------------------------------------------------------------------------
function getCfOpts() {
  var result = {}
  var appEnv = cfenv.getAppEnv()
  var creds

  result.isLocal = appEnv.isLocal
  result.port    = appEnv.port
  result.bind    = appEnv.bind
  result.url     = appEnv.url

  return result
}

/*
#-------------------------------------------------------------------------------
# Copyright IBM Corp. 2014
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#-------------------------------------------------------------------------------
*/
