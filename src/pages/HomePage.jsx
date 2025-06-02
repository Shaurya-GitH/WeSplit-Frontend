import {useNavigate} from "react-router-dom";

const HomePage=()=>{
    const navigate=useNavigate();
    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                        Welcome to
                        <span
                            className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          WeSplit
        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                        Split bills effortlessly with friends and family.
                        <br className="hidden sm:block"/>
                        Track expenses, settle debts, and keep everyone happy.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <button
                            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            onClick={()=>navigate("/register")}>
                            Start Splitting Now
                        </button>
                        <button
                            className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
                            onClick={() => window.open("https://github.com/Shaurya-GitH/WeSplit", "_blank")}>
                            Github
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-16">
        <span
            className="bg-white/60 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
          📱 Mobile Friendly
        </span>
                        <span
                            className="bg-white/60 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
          💰 Track Expenses
        </span>
                        <span
                            className="bg-white/60 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
          👥 Group Management
        </span>
                        <span
                            className="bg-white/60 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
          🔒 Secure & Private
        </span>
                    </div>

                    <div className="relative max-w-md mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
                            <div className="bg-gray-100 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900">Recent Split</h3>
                                    <span className="text-green-600 font-medium">$24.50</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 text-sm font-medium">A</span>
                                            </div>
                                            <span className="text-gray-700">Alex</span>
                                        </div>
                                        <span className="text-gray-900 font-medium">$8.17</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 text-sm font-medium">S</span>
                                            </div>
                                            <span className="text-gray-700">Sarah</span>
                                        </div>
                                        <span className="text-gray-900 font-medium">$8.17</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <span className="text-purple-600 text-sm font-medium">M</span>
                                            </div>
                                            <span className="text-gray-700">Mike</span>
                                        </div>
                                        <span className="text-gray-900 font-medium">$8.16</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
                        <div
                            className="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
                    </div>
                </div>
            </div>

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-10 animate-pulse"></div>
                <div
                    className="absolute top-3/4 right-1/4 w-48 h-48 bg-indigo-200 rounded-full opacity-10 animate-pulse delay-500"></div>
                <div
                    className="absolute top-1/2 right-1/3 w-32 h-32 bg-purple-200 rounded-full opacity-10 animate-pulse delay-1000"></div>
            </div>
        </div>

    )
}
export default HomePage