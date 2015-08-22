'use strict'

function MultiStore (rdf, options) {
  var self = this

  options = options || {}
  self.router = options.router

  self.graph = function (iri, callback, options) {
    options = options || {}
    self.router(iri, 'graph', function (err, store) {
      if (err) return callback(null, err)
      store.graph(iri, callback, options)
    })
  }

  self.match = function (iri, subject, predicate, object, callback, limit) {
    self.router(iri, 'match', function (err, store) {
      if (err) return callback(null, err)
      store.match(iri, subject, predicate, object, callback, limit)
    })
  }

  self.add = function (iri, graph, callback, options) {
    self.router(iri, 'add', function (err, store) {
      if (err) return callback(null, err)
      store.add(iri, graph, callback, options)
    })
  }

  self.merge = function (iri, graph, callback, options) {
    self.router(iri, 'merge', function (err, store) {
      if (err) return callback(null, err)
      store.merge(iri, graph, callback, options)
    })
  }

  self.remove = function (iri, graph, callback) {
    self.router(iri, 'remove', function (err, store) {
      if (err) return callback(null, err)
      store.remove(iri, graph, callback)
    })
  }

  self.removeMatches = function (iri, subject, predicate, object, callback) {
    self.router(iri, 'removeMatches', function (err, store) {
      if (err) return callback(null, err)
      store.add(iri, subject, predicate, object, callback)
    })
  }

  self.delete = function (iri, callback) {
    self.router(iri, 'removeMatches', function (err, store) {
      if (err) return callback(null, err)
      store.add(iri, callback)
    })
  }
}

module.exports = MultiStore
