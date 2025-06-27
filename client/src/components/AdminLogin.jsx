import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, User, Shield, AlertCircle } from "lucide-react";

const AdminLogin = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Check against environment variables
        const adminUser = import.meta.env.VITE_ADMIN_USER;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (credentials.username === adminUser && credentials.password === adminPassword) {
            // Store admin session
            sessionStorage.setItem('admin_authenticated', 'true');
            sessionStorage.setItem('admin_login_time', Date.now().toString());
            onLogin(true);
        } else {
            setError("Invalid username or password");
        }
        
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <Shield size={64} className="mx-auto mb-4 text-red-600" />
                    <h1 className="text-2xl font-bold text-neutral-800">Admin Panel</h1>
                    <p className="text-neutral-600 mt-2">IT-vate Training Management</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Enter admin username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Enter admin password"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle size={20} className="text-red-500 mr-2" />
                            <span className="text-red-700 text-sm">{error}</span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Authenticating...
                            </>
                        ) : (
                            "Login to Admin Panel"
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-neutral-500">
                        Authorized personnel only. All access is logged.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
