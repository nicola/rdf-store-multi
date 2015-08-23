'use strict'

function MultiStore (options) {
  var self = this

  options = options || {}
  self.router = options.router

  self.graph = function (iri, callback, options) {
    self.router('graph', arguments, function (err, store) {
      if (err) return callback(null, err)
      store.graph(iri, callback, options)
    })
  }

  self.match = function (iri, subject, predicate, object, callback, limit) {
    self.router('match', arguments, function (err, store) {
      if (err) return callback(null, err)
      store.match(iri, subject, predicate, object, callback, limit)
    })
  }

  self.add = function (iri, graph, callback, options) {
    self.router('add', arguments, function (err, store) {
      if (err) return callback(null, err)
      store.add(iri, graph, callback, options)
    })
  }

  self.merge = function (iri, graph, callback, options) {
    self.router('merge', arguments, function (err, store) {
      if (err) return callback(null, err)
      store.merge(iri, graph, callback, options)
    })
  }

  self.remove = function (iri, graph, callback) {
    self.router('remove', arguments, function (err, store) {
      if (err) return callback(null, err)
      store.remove(iri, graph, callback)
    })
  }

  self.removeMatches = function (iri, subject, predicate, object, callback) {
    self.router('removeMatches', arguments, function (err, store) {
      if (err) return callback(null, err)
      store.removeMatches(iri, subject, predicate, object, callback)
    })
  }

  self.delete = function (iri, callback) {
    self.router('delete', arguments, function (err, store) {
      if (err) return callback(null, err)
      store.delete(iri, callback)
    })
  }
}

module.exports = MultiStore
