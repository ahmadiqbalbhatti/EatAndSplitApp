import Button from "./includes/Button";
import {useReducer} from "react";


const initialState = {
  bill: 0, paidByUser: 0, whoIsPaying: "user"
};

const ACTIONS = {
  SET_BILL         : "setBill",
  SET_PAID_USER    : "setPaidByUser",
  SET_WHO_IS_PAYING: "setWhoIsPaying"
};

function reducer(state, actions) {
  switch (actions.type) {
    case ACTIONS.SET_BILL:
      return {
        ...state, bill: actions.payload
      };
    case ACTIONS.SET_PAID_USER:
      return {
        ...state,
        paidByUser: actions.payload > state.bill ? state.paidByUser : actions.payload
      };
    case ACTIONS.SET_WHO_IS_PAYING:
      return {
        ...state, whoIsPaying: actions.payload
      };

    default:
      return state;

  }
}


const FormSplitBill = function ({selectedFriend, onSplitBill}) {
  const [
          {
            bill, paidByUser, whoIsPaying
          }, dispatch
        ] = useReducer(reducer, initialState);

  const paidByFriend = bill ? bill - paidByUser : "";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };

  return (
    <form action="" className={"form-split-bill"} onSubmit={handleSubmit}>
      <h2>Split a Bill with {selectedFriend.name}</h2>

      <label htmlFor="">💰 Bill value</label>
      <input type="text" value={bill > 0 ? bill : ""}
             onChange={event => dispatch({
               type: ACTIONS.SET_BILL, payload: Number(event.target.value)
             })}/>

      <label htmlFor="">🧍🏼‍♀️ Your expenses</label>
      <input type="text" value={paidByUser > 0 ? paidByUser : ""}
             onChange={event => dispatch({
               type: ACTIONS.SET_PAID_USER, payload: Number(event.target.value)
             })}/>

      <label htmlFor="">🤼 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend}/>

      <label htmlFor="">🤑 Who is paying the bill</label>
      <select name="" id="" value={whoIsPaying}
              onChange={event => dispatch({
                type: ACTIONS.SET_WHO_IS_PAYING, payload: event.target.value
              })}>

        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>


      <Button>Add</Button>

    </form>
  );
};


export default FormSplitBill;
