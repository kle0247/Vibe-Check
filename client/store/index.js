import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import auth from './auth'
import tracks from './tracks'
import track from './track'
import topTracks from './topTracks'
import analyzeTracks from './analyzeTracks'

const reducer = combineReducers({ auth, tracks, track, topTracks, analyzeTracks })
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './auth'