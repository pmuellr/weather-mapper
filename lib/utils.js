/* Licensed under the Apache License. See footer for details. */

path = require("path")

_ = require("underscore")

pkg = require("../package.json")

VERBOSE = false

utils = exports

utils.PROGRAM     = pkg.name
utils.PACKAGE     = pkg.name
utils.VERSION     = pkg.version
utils.DESCRIPTION = pkg.description
utils.HOMEPAGE    = pkg.homepage

//------------------------------------------------------------------------------
utils.exportFunctions = function exports(exps, funcs) {
  var func
  var name

  for (var i=0; i<funcs.length; i++) {
    func = funcs[i]
    if (func == null) throw new Error("null passed as function index " + i)

    name = func.name
    if (name == null) throw new Error("unnamed function: " + func)

    exps[name] = func
  }
}

//------------------------------------------------------------------------------
utils.getEnvNumber = function getEnvNumber(varName) {
  var value = parseInt(process[varName], 10)
  if (isNaN(value)) return null

  return value
}

//------------------------------------------------------------------------------
utils.log = function log() {
  var args = _.toArray(arguments)

  if (args.length == 0) {
    args = [""]
  }
  else {
    args[0] = utils.PROGRAM + ": " + args[0]
  }

  console.log.apply(console, args)
}

//------------------------------------------------------------------------------
utils.logError = function logError() {
  utils.log.apply(utils, arguments)
  process.exit(1)
}

//------------------------------------------------------------------------------
utils.vlog = function vlog() {
  if (!VERBOSE) return

  utils.log.apply(utils, arguments)
}

//------------------------------------------------------------------------------
utils.verbose = function verbose(value) {
  if (arguments.length == 0) return VERBOSE

  VERBOSE = !!value
  return VERBOSE
}

//------------------------------------------------------------------------------
utils.setProgramName = function setProgramName(fileName) {
  fileName = path.basename(fileName)
  fileName = fileName.split(".")
  fileName.pop()
  fileName = fileName.join(".")

  utils.PROGRAM = fileName
}

//------------------------------------------------------------------------------
utils.JS = function JS(object) {
  return JSON.stringify(object)
}

//------------------------------------------------------------------------------
utils.JL = function JL(object) {
  return JSON.stringify(object, null, 4)
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
//------------------------------------------------------------------------------
*/
