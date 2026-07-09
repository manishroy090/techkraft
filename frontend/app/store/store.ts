import { configureStore } from '@reduxjs/toolkit'
import AuthUserReducer  from '@store/features/AuthUserSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const presistConfig = {
    key:'root',
    storage
}
const appReducer = combineReducers({
   authUser: AuthUserReducer,
})

const rootReducer = (state:any,action:any) =>{
  if(action.type =="authuser/logout"){
      storage.removeItem('persist:root')
      state = {} 
  }

  return appReducer(state,action);

}


const persistedReducer = persistReducer(presistConfig,rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
         serializableCheck:{
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         }
    })
})

export const persistor = persistStore(store)
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store