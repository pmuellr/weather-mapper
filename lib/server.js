// Licensed under the Apache License. See footer for details.

fs   = require("fs")
path = require("path")
zlib = require("zlib")

_     = require("underscore")
hapi  = require("hapi")
cfenv = require("cfenv")

utils = require("./utils")

//------------------------------------------------------------------------------
utils.exportFunctions(exports, [
  start,
])

//------------------------------------------------------------------------------
function startedCallback(opts) {
  utils.log("server running at", opts.url)
}

//------------------------------------------------------------------------------
function start(opts, startedCB) {
  if (!startedCB) startedCB = function() { startedCallback(opts) }

  var serverOpts = {}
  var server = hapi.createServer(opts.bind, opts.port, serverOpts)

  // static files
  server.route({
    method:  "GET",
    path:    "/{param*}",
    handler: { directory: { path: "www", index: true, lookupCompressed: true } }
  })

  server.route({
    method:  "GET",
    path:    "/list",
    handler: { file: { path: "www/index.html", lookupCompressed: true } }
  })

  server.route({
    method:  "GET",
    path:    "/about",
    handler: { file: { path: "www/index.html", lookupCompressed: true } }
  })

  if (!opts.isLocal) {
    gzipDir("www")
  }

  // start the server
  server.start(startedCB)
}

//------------------------------------------------------------------------------
var CompressableExtList = "html css js json svg"
var CompressableExt     = {}

CompressableExtList.split(" ").forEach(function (ext) {
  CompressableExt[ext] = true
})

//------------------------------------------------------------------------------
function gzipDir(dir) {
  var files = fs.readdirSync(dir)

  for (var i=0; i<files.length; i++) {
    var file  = path.join(dir, files[i])
    var stats = fs.statSync(file)

    if (stats.isDirectory()) {
      gzipDir(file)
    }
    else {
      gzipFile(file)
    }
  }
}

//------------------------------------------------------------------------------
function gzipFile(iFile) {
  var ext = iFile.split(".").pop()
  if (!CompressableExt[ext]) return

  var oFile = iFile + ".gz"
  utils.log("creating " + oFile)

  var gzip = zlib.createGzip()

  var iStream = fs.createReadStream(  iFile )
  var oStream = fs.createWriteStream( oFile )

  iStream.pipe(gzip).pipe(oStream)
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
