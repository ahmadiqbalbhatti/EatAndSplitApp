import Button from "./includes/Button";
import {useState} from "react";

const FormSplitBill = function ({selectedFriend, onSplitBill}) {
    const [bill, setBill] = useState(0)
    const [paidByUser, setPaidByUser] = useState(0)
    const paidByFriend = bill ? bill - paidByUser : "";
    const [whoIsPaying, setWhoIsPaying] = useState("user")


    const handleSubmit = (event) => {
      event.preventDefault();

      if (!bill || !paidByUser) return;

      onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)

    }

    return (<form action="" className={"form-split-bill"} onSubmit={handleSubmit}>
        <h2>Split a Bill with {selectedFriend.name}</h2>

        <label htmlFor="">💰 Bill value</label>
        <input type="text" value={bill > 0 ? bill : ""}
               onChange={event => setBill(Number(event.target.value))}/>

        <label htmlFor="">🧍🏼‍♀️ Your expenses</label>
        <input type="text" value={paidByUser > 0 ? paidByUser : ""}
               onChange={event => setPaidByUser(
                   Number(event.target.value) > bill
                       ?
                       paidByUser
                       :
                       Number(event.target.value))}/>

        <label htmlFor="">🤼 {selectedFriend.name}'s expense</label>
        <input type="text" disabled value={paidByFriend}/>

        <label htmlFor="">🤑 Who is paying the bill</label>
        <select name="" id="" value={whoIsPaying}
                onChange={event => setWhoIsPaying(event.target.value)}>

            <option value="user">You</option>
            <option value="friend">{selectedFriend.name}</option>
        </select>


        <Button>Add</Button>

    </form>)
}


export default FormSplitBill;
