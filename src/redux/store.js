const { configureStore } = require("@reduxjs/toolkit");
const { appReducer } = require("./reducer/app.reducer");


const store = configureStore({
    reducer:{
        app: appReducer
    }
})
export default store;