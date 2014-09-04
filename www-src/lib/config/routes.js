// Licensed under the Apache License. See footer for details.

var home  = require("../controllers/home")
var map   = require("../controllers/map")
var about = require("../controllers/about")

module.exports = configRoutes

//------------------------------------------------------------------------------
function configRoutes($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true)

  $routeProvider.when("/",      controllerTemplate(home))
  $routeProvider.when("/map",   controllerTemplate(map))
  $routeProvider.when("/about", controllerTemplate(about))

  $routeProvider.otherwise({ redirectTo: "/" })
}

//------------------------------------------------------------------------------
function controllerTemplate(ctrl, view) {
  return {
    controller: ctrl,
    template:   ctrl.view
  }
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
