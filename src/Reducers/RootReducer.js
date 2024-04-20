import { combineReducers } from "redux";
import { setData } from "./SetDataReducer";
import { setUserTickets } from "./SetUserTicketReducer";

let rootReducer=combineReducers({setData,setUserTickets});

export default rootReducer;