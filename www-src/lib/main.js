// Licensed under the Apache License. See footer for details.

var path = require("path")

var controllerBody = require("./controllers/body")
var defaultGeo     = require("./default.geo.json")

//------------------------------------------------------------------------------

var mod = angular.module("app", [ "ngResource" ])

mod.controller("body", controllerBody)

//------------------------------------------------------------------------------

var Map
var LayerBasemap
var LayerBasemapLabels
var BasemapsWithLabels

initBasemapsWithLabels()
initForecastIcons()

//------------------------------------------------------------------------------

$(main())

//------------------------------------------------------------------------------
function main() {
  Map = L.map("map")
  // Map.setView([51.505, -0.09], 13)

  setBasemap("Topographic")

  var boundsLatLng = []
  for (var iFeature=0; iFeature<defaultGeo.features.length; iFeature++) {
    var feature = defaultGeo.features[iFeature]
    var name = feature.properties.name
    var lat  = feature.geometry.coordinates[1]
    var lng  = feature.geometry.coordinates[0]

    boundsLatLng.push(L.latLng(lat, lng))

    var icon = L.divIcon({
      iconSize: [32,32],
      html:     '<img width=32 height=32 src="images/meteocons/fog.svg">'
    })

    var icon = L.icon({
      iconSize:  [32,32],
      iconUrl:   "images/meteocons/fog.svg",
      className: "weather-icon",
    })

    var markerOpts = {
      title: name,
      icon:  icon
    }

    L.marker([lat, lng], markerOpts).addTo(Map)
  }

  Map.fitBounds(L.latLngBounds(boundsLatLng), {padding:[30,30]})

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

function initForecastIcons() {
  ForecastIcons = {
    "clear-day":               true,
    "clear-night":             true,
    "rain":                    true,
    "snow":                    true,
    "sleet":                   true,
    "wind":                    true,
    "fog":                     true,
    "cloudy":                  true,
    "partly-cloudy-day":       true,
    "partly-cloudy-night":     true,
  }
}

/*
#-------------------------------------------------------------------------------
# Copyright IBM Corp. 2014
#
# Licensed under the Apache Licenseclear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-nightVersion 2.0 (the "License");
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
