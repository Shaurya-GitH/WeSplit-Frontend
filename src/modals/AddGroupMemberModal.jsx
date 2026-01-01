import { useState } from 'react';
import Loading from "../components/Loading.jsx";
import userService from "../services/userService.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import * as groupService from "../services/groupService.js";

const AddGroupMemberModal = ({ setShowAddMember, groupMembers, groupId, setGroupMembers }) => {
    const [selectedEmails, setSelectedEmails] = useState([]);

    const result = useQuery({
        queryKey: ['friendsToAdd'],
        queryFn: userService.getFriends
    });

    const queryClient=useQueryClient()
    const mutation=useMutation({
        mutationFn: groupService.addGroupMember,
        onSuccess:(response)=>{
            queryClient.invalidateQueries({queryKey:['groups']})
            queryClient.invalidateQueries({queryKey:['groupBalance']})
            queryClient.invalidateQueries({queryKey:['groupUnsettled']})
            queryClient.invalidateQueries({queryKey:['groupPayment']})
            setShowAddMember(false)
            setGroupMembers(response.data)
            },
        onError:(error)=>{
        console.log(error.response.data.exception)
        }
    });

    if (result.isLoading) {
        return <Loading />;
    }

    // Safe access in case data is undefined
    const friends = result.data?.data || [];

    // Filter out friends who are already in the group (comparing emails)
    const availableFriends = friends.filter(friend =>
        !groupMembers.some(member => member.email === friend.email)
    );

    // UPDATED: Handler now accepts an email string
    const handleToggleFriend = (email) => {
        setSelectedEmails(prev => {
            if (prev.includes(email)) {
                // Remove if already selected
                return prev.filter(e => e !== email);
            } else {
                // Add if not selected
                return [...prev, email];
            }
        });
    };

    const handleAddMembers = () => {
        mutation.mutate({
            groupId: groupId,
            selectedMemberList: selectedEmails
        });
    };

    return (
        <div className="modal-container">
            <h3>Add Members</h3>

            <div className="friends-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {availableFriends.length === 0 ? (
                    <p>No new friends to add.</p>
                ) : (
                    availableFriends.map((friend) => (
                        <div
                            // UPDATED: Use email as key
                            key={friend.email}
                            style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}
                        >
                            <input
                                type="checkbox"
                                // UPDATED: ID based on email to match label
                                id={`friend-${friend.email}`}
                                // UPDATED: Check if email is in state
                                checked={selectedEmails.includes(friend.email)}
                                // UPDATED: Pass email to handler
                                onChange={() => handleToggleFriend(friend.email)}
                                style={{ marginRight: '10px' }}
                            />
                            {/* UPDATED: Label htmlFor matches input ID */}
                            <label htmlFor={`friend-${friend.email}`} style={{ cursor: 'pointer', flex: 1 }}>
                                <span style={{ marginRight: '8px', fontWeight: 'bold' }}>
                                    {friend.firstName}
                                </span>
                                <span style={{ color: '#666', fontSize: '0.9em' }}>
                                    {friend.email}
                                </span>
                            </label>
                        </div>
                    ))
                )}
            </div>

            <div className="actions" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={handleAddMembers} disabled={selectedEmails.length === 0}>
                    Add Selected
                </button>
                <button onClick={() => setShowAddMember(false)}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddGroupMemberModal;