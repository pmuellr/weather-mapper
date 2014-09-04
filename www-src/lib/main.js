// Licensed under the Apache License. See footer for details.

var path = require("path")

var controllerBody = require("./controllers/body")

//------------------------------------------------------------------------------

var mod = angular.module("app", [ "ngResource" ])

mod.controller("body", controllerBody)

//------------------------------------------------------------------------------

var Map
var LayerBasemap
var LayerBasemapLabels
var BasemapsWithLabels

initBasemapsWithLabels()

//------------------------------------------------------------------------------

$(main())

//------------------------------------------------------------------------------
function main() {
  Map = L.map("map").setView([51.505, -0.09], 13)

  setBasemap("Topographic")

  $("#basemaps-selector").change(function(){
    setBasemap($(this).val())
  })
}


//------------------------------------------------------------------------------
function setBasemap(basemap) {
  if (LayerBasemap) {
    Map.removeLayer(LayerBasemap)
  }

  LayerBasemap = L.esri.basemapLayer(basemap)
  Map.addLayer(LayerBasemap)

  //-----------------------------------
  if (LayerBasemapLabels) {
    Map.removeLayer(LayerBasemapLabels)
  }

  if (BasemapsWithLabels[basemap]) {
    LayerBasemapLabels = L.esri.basemapLayer(basemap + 'Labels')
    Map.addLayer(LayerBasemapLabels)
  }
}

//------------------------------------------------------------------------------
function initBasemapsWithLabels() {
  BasemapsWithLabels  = {
    ShadedRelief: true,
    Oceans:       true,
    Gray:         true,
    DarkGray:     true,
    Imagery:      true,
    Terrain:      true,
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
