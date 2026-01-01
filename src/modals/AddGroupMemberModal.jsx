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

    const friends = result.data?.data || [];

    const availableFriends = friends.filter(friend =>
        !groupMembers.some(member => member.email === friend.email)
    );

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Add Members
                    </h3>
                </div>

                {/* Body */}
                <div className="max-h-[300px] overflow-y-auto px-6 py-4">
                    {availableFriends.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center">
                            No new friends to add.
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {availableFriends.map((friend) => (
                                <label
                                    key={friend.email}
                                    htmlFor={`friend-${friend.email}`}
                                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 transition"
                                >
                                    <input
                                        type="checkbox"
                                        id={`friend-${friend.email}`}
                                        checked={selectedEmails.includes(friend.email)}
                                        onChange={() => handleToggleFriend(friend.email)}
                                        className="h-4 w-4 accent-indigo-600"
                                    />

                                    <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {friend.firstName}
                  </span>
                                        <span className="text-sm text-gray-500">
                    {friend.email}
                  </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t px-6 py-4">
                    <button
                        onClick={() => setShowAddMember(false)}
                        className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleAddMembers}
                        disabled={selectedEmails.length === 0}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
                    >
                        Add Selected
                    </button>
                </div>
            </div>
        </div>
    );

};

export default AddGroupMemberModal;