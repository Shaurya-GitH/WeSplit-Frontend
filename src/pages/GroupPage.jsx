import {useQuery} from "@tanstack/react-query";
import {getGroups} from "../services/groupService.js";
import {Link} from "react-router-dom";
import {useState} from "react";
import Toggleable from "../components/Toggleable.jsx";
import AddFriendModal from "../modals/AddFriendModal.jsx";
import AddGroupModal from "../modals/AddGroupModal.jsx";
import Loading from "../components/Loading.jsx";

const GroupPage=()=> {
    const [showAddGroup,setShowAddGroup]=useState(false);
    const result=useQuery({
        queryKey:['groups'],
        queryFn:getGroups,
    });
    if(result.isLoading){
        return (
            <Loading/>
        )
    }
    const groups=result.data.data;
    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-linear-to-r from-cyan-500 to-blue-500 shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
                            <p className="mt-1 text-sm text-white">Manage your WeSplit groups</p>
                        </div>
                        <button
                            onClick={() => setShowAddGroup(true)}
                            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-white hover:text-blue-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Group
                        </button>
                    </div>
                </div>
            </div>
            <div  className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-4">
                    {groups.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {groups.map((group) => (
                            <div key={group.groupId} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                <Link
                                    to={`/groups/${group.groupId}`}
                                    state={{group}}
                                    className="block"
                                >
                                    <h1 className="text-lg font-bold text-blue-600 hover:text-blue-600 transition-colors">
                                        {group.groupName}
                                    </h1>
                                </Link>
                                <h5 className="text-sm text-gray-500 mt-1">
                                    {group.createdAt}
                                </h5>
                            </div>
                        ))}
                    </div>
                    ):(
                    /* Empty State */
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No groups yet</h3>
                        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                            Start creating groups to easily split bills and manage shared expenses with your circle.
                        </p>
                        <button
                            onClick={() => setShowAddGroup(true)}
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Your First Group
                        </button>
                    </div>
                    )}
                </div>
            </div>
            {/* Add Group Modal */}
            <Toggleable state={showAddGroup}>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <AddGroupModal setShowAddGroup={setShowAddGroup} />
                    </div>
                </div>
            </Toggleable>
        </div>
    )
}
export default GroupPage