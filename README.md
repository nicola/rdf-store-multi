# rdf-store-multi

RDF Store that can run multiple RDF stores [RDF-Ext Interface](http://bergos.github.io/rdf-ext-spec/) specification.

## Install

```
npm install --save rdf-store-multi
```

## Usage

You will have to specify a `router` in the `options` to route to which store should perform a method

``` javascript
var string = require('string')
var rdf = require('rdf-ext')()
var LdpStore = require('rdf-store-ldp')
var FileStore = require('rdf-store-fs')
var MultiStore = require('rdf-store-multi')

var ldp = new LdpStore(rdf)
var fs = new FileStore(rdf)
var multi = new MultiStore(rdf, {
  router: function (iri, method, callback) {
    if (string(iri).beginsWith('http://localhost')) {
      callback(null, fs)
    } else {
      callback(null, ldp)
    }
  }
})
```

## History

Originally written by [Nicola Greco](https://github.com/nicola)

## Licence

MIT