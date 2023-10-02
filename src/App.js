import FriendsList from "./components/FriendsList";
import Button from "./components/includes/Button";
import FormToAddFriend from "./components/FormToAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import {useState} from "react";

const initialFriends = [{
    id: 118836, name: "Clark", image: "https://i.pravatar.cc/48?u=118836", balance: -7,
}, {
    id: 933372, name: "Sarah", image: "https://i.pravatar.cc/48?u=933372", balance: 20,
}, {
    id: 499476, name: "Anthony", image: "https://i.pravatar.cc/48?u=499476", balance: 0,
},];

const App = () => {
    const [showAddFriend, setShowAddFriend] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState(null)
    const [friends, setFriends] = useState(initialFriends);


    const handleShowAddFriend = function () {
        setShowAddFriend(show => !show);
    }

    const handleSelection = (friend) => {
        // if (!selectedFriend) {
        //     // setSelectedFriend(friend);
        //     return
        // }

        setSelectedFriend(selected => selected?.id === friend.id ? null : friend)
        setShowAddFriend(false);
    }

    const handleAddFriend = (friend) => {
        setFriends(friends => [...friends, friend]);
        setShowAddFriend(false)
    }


    const handleSplitBill = (value) => {
        setFriends(friends => friends.map(friend => {
            return friend.id === selectedFriend?.id ? {...friend, balance: friend.balance + value} : friend;
        }))

        setSelectedFriend(null)

    }

    return (<div className={"app"}>
        <div className="sidebar">
            <FriendsList
                friends={friends}
                selectedFriend={selectedFriend}
                onSelection={handleSelection}

            />
            {
                showAddFriend && <FormToAddFriend onAddFriend={handleAddFriend}/>
            }
            <Button onClick={handleShowAddFriend}>{!showAddFriend ? "Add Friend" : "Close"}</Button>
        </div>

        {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}

    </div>)
}

export default App;
