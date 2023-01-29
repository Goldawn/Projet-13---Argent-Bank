import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUserToken : (state, action) => {
      //exemple d'action { type: "auth/addUserToken", payload: "aEzgzfezr56gzdvzpmAfdhgz"}
      state.userToken = action.payload;
    },
    addUserInfo : (state, action) => {
      //exemple d'action { type: "auth/addUserInfo", payload: {email: "tony@stark.com", firstName: "Tony", lastName: "Stark"}}
      const { firstName, lastName, email } = action.payload
      state.userInfo.firstName = firstName;
      state.userInfo.lastName = lastName;
      state.userInfo.email = email;
    },
    editUserInfo : (state, action) => {
      //exemple d'action { type: "auth/editUserInfo", payload: { "firstName": "Iron", "lastName": "Man" }}
      const { firstName, lastName } = action.payload
      state.userInfo.firstName = firstName;
      state.userInfo.lastName = lastName;
    },
    resetUser : (state, action) => {
      // state = initialState
    }
  },
  extraReducers: {},
})

export default authSlice.reducer