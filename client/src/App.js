import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import ApolloClient from 'apollo-client'
import { ApolloProvider, createNetworkInterface } from 'react-apollo'


import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

import { typeDefs } from './schema'
import ChannelsListWithData from './components/ChannelsListWithData'

const schema = makeExecutableSchema({ typeDefs })
addMockFunctionsToSchema({ schema })

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql',
})

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500)
  }
}])

const client = new ApolloClient({
  networkInterface
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
