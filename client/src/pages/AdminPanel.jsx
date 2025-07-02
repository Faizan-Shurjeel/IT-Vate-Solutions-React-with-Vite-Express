import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Users,
    CreditCard,
    FileText,
    Settings,
    LogOut,
    Search,
    Filter,
    Download,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    User,
    Mail,
    Phone,
    Calendar,
    Package,
    DollarSign,
    BookOpen,
    Target,
    Award,
    Crown,
    GraduationCap,
    Zap,
    RefreshCw,
    MoreVertical,
    Edit,
    Trash2,
    Image as ImageIcon,
    ExternalLink
} from "lucide-react";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/utils/firebase";
import AdminLogin from "@/components/AdminLogin";

// Statistics Card Component
const StatsCard = ({ title, value, icon, color, change }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-200">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-neutral-600 mb-1">{title}</p>
                <p className="text-2xl font-bold text-neutral-800">{value}</p>
                {change && (
                    <p className={`text-xs mt-1 ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {change.positive ? '↗' : '↘'} {change.value}
                    </p>
                )}
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
                {icon}
            </div>
        </div>
    </div>
);

// Edit User Form inside Modal
const EditUserForm = ({ user, onSave, onCancel, saving }) => {
    const [form, setForm] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        selectedPackage: user.selectedPackage || "",
        selectedLevel: user.selectedLevel || "",
        selectedOption: user.selectedOption || "",
        paymentAmount: user.paymentAmount || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700">First Name</label>
                    <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-neutral-300 rounded-md py-2 px-3"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Last Name</label>
                    <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-neutral-300 rounded-md py-2 px-3"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Email</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-neutral-300 rounded-md py-2 px-3"
                        required
                        type="email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Phone</label>
                    <input
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-neutral-300 rounded-md py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Package</label>
                    <select
                        name="selectedPackage"
                        value={form.selectedPackage}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-neutral-300 rounded-md py-2 px-3"
                        required
                    >
                        <option value="">Select...</option>
                        <option value="complete">Complete Training</option>
                        <option value="progressive">Progressive Path</option>
                        <option value="direct">Direct Entry</option>
                        <option value="special">Special Track</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Level</label>
                    <input
                        name="selectedLevel"
                        value={form.selectedLevel}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-neutral-300 rounded-md py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Option</label>
                    <input
                        name="selectedOption"
                        value={form.selectedOption}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-neutral-300 rounded-md py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700">Payment Amount</label>
                    <input
                        name="paymentAmount"
                        value={form.paymentAmount}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-neutral-300 rounded-md py-2 px-3"
                        type="number"
                    />
                </div>
            </div>
            <div className="flex space-x-3 pt-4">
                <Button type="submit" className="bg-primary text-white" disabled={saving}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save
                </Button>
                <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel
                </Button>
            </div>
        </form>
    );
};

// User Detail Modal Component (with Edit & Delete)
const UserDetailModal = ({
    user,
    isOpen,
    onClose,
    onUpdateStatus,
    onDeleteUser,
    onEditUser,
}) => {
    const [updating, setUpdating] = useState(false);
    const [editing, setEditing] = useState(false);
    const [savingEdit, setSavingEdit] = useState(false);

    if (!isOpen || !user) return null;

    const getPackageIcon = (packageId, levelId, optionId) => {
        if (packageId === "complete") {
            return optionId === "bundle" ? 
                <Package className="w-5 h-5 text-primary" /> : 
                <GraduationCap className="w-5 h-5 text-blue-600" />;
        } else if (packageId === "progressive") {
            return <BookOpen className="w-5 h-5 text-green-600" />;
        } else if (packageId === "direct") {
            if (levelId === "level-1") return <BookOpen className="w-5 h-5 text-blue-600" />;
            if (levelId === "level-2") return <Target className="w-5 h-5 text-orange-600" />;
            if (levelId === "level-3") return <Award className="w-5 h-5 text-purple-600" />;
        } else if (packageId === "special") {
            return <User className="w-5 h-5 text-indigo-600" />;
        }
        return <Package className="w-5 h-5 text-neutral-600" />;
    };

    const getPackageName = (packageId, levelId, optionId) => {
        if (packageId === "complete") {
            return optionId === "bundle" ? "Complete Training Bundle" : "Complete Training - Level by Level";
        } else if (packageId === "progressive") {
            return "Progressive Path - Level 1";
        } else if (packageId === "direct") {
            return `Direct Entry - Level ${levelId?.split('-')[1] || '1'}`;
        } else if (packageId === "special") {
            return "Special Track - One on One";
        }
        return "Unknown Package";
    };

    const handleStatusUpdate = async (newStatus) => {
        setUpdating(true);
        try {
            await updateDoc(doc(db, "users", user.id), {
                paymentStatus: newStatus,
                statusUpdatedAt: new Date(),
                statusUpdatedBy: 'admin'
            });
            onUpdateStatus(user.id, newStatus);
            onClose();
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        try {
            await deleteDoc(doc(db, "users", user.id));
            onDeleteUser(user.id);
            onClose();
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user");
        }
    };

    const handleEditSave = async (form) => {
        setSavingEdit(true);
        try {
            await updateDoc(doc(db, "users", user.id), form);
            onEditUser(user.id, form);
            setEditing(false);
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user");
        } finally {
            setSavingEdit(false);
        }
    };

    // Modal content
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-neutral-800">User Details</h2>
                    <div className="flex space-x-2">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setEditing(true)}
                            className="border-blue-500 text-blue-600"
                        >
                            <Edit className="w-5 h-5" />
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={handleDelete}
                            className="border-red-500 text-red-600"
                        >
                            <Trash2 className="w-5 h-5" />
                        </Button>
                        <button
                            onClick={onClose}
                            className="text-neutral-500 hover:text-neutral-700 ml-2"
                        >
                            <XCircle size={24} />
                        </button>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    {editing ? (
                        <EditUserForm
                            user={user}
                            onSave={handleEditSave}
                            onCancel={() => setEditing(false)}
                            saving={savingEdit}
                        />
                    ) : (
                        <>
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="font-medium text-neutral-700 w-20">Name:</span>
                                        <span className="text-neutral-600">{user.firstName} {user.lastName}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="font-medium text-neutral-700 w-20">Email:</span>
                                        <span className="text-neutral-600">{user.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="font-medium text-neutral-700 w-20">Phone:</span>
                                        <span className="text-neutral-600">{user.phoneNumber || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-neutral-400" />
                                        <span className="font-medium text-neutral-700 w-20">Joined:</span>
                                        <span className="text-neutral-600">
                                            {user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Package Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Package Information</h3>
                                <div className="bg-neutral-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-3">
                                        {getPackageIcon(user.selectedPackage, user.selectedLevel, user.selectedOption)}
                                        <span className="ml-2 font-semibold text-neutral-800">
                                            {getPackageName(user.selectedPackage, user.selectedLevel, user.selectedOption)}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium text-neutral-700">Package:</span>
                                            <span className="ml-2 text-neutral-600">{user.selectedPackage || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-neutral-700">Level:</span>
                                            <span className="ml-2 text-neutral-600">{user.selectedLevel || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-neutral-700">Option:</span>
                                            <span className="ml-2 text-neutral-600">{user.selectedOption || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-neutral-700">Amount:</span>
                                            <span className="ml-2 text-neutral-600">₨{user.paymentAmount || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Payment Information */}
                            {user.paymentMethod && (
                                <div>
                                    <h3 className="text-lg font-semibold text-neutral-800 mb-4">Payment Information</h3>
                                    <div className="bg-neutral-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                                            <div>
                                                <span className="font-medium text-neutral-700">Method:</span>
                                                <span className="ml-2 text-neutral-600 capitalize">{user.paymentMethod}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-neutral-700">Transaction ID:</span>
                                                <span className="ml-2 text-neutral-600 font-mono">{user.transactionId || 'N/A'}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-neutral-700">Status:</span>
                                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                                    user.paymentStatus === 'verified' ? 'bg-green-100 text-green-800' :
                                                    user.paymentStatus === 'pending_verification' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {user.paymentStatus || 'pending'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-neutral-700">Submitted:</span>
                                                <span className="ml-2 text-neutral-600">
                                                    {user.paymentSubmittedAt ? 
                                                        new Date(user.paymentSubmittedAt.seconds * 1000).toLocaleString() : 
                                                        'N/A'
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        {/* Payment Screenshot */}
                                        {user.paymentScreenshot && (
                                            <div className="border-t border-neutral-200 pt-4">
                                                <div className="flex items-center mb-3">
                                                    <ImageIcon className="w-4 h-4 mr-2 text-primary" />
                                                    <span className="font-medium text-neutral-700">Payment Screenshot:</span>
                                                </div>
                                                <div className="space-y-2">
                                                    <img 
                                                        src={`http://itvate.habeel.xyz/api/payment-screenshots/${user.paymentScreenshot}`}
                                                        alt="Payment Screenshot" 
                                                        className="max-w-md h-auto rounded-lg border border-neutral-200 cursor-pointer hover:shadow-lg transition-shadow"
                                                        onClick={() => window.open(`http://itvate.habeel.xyz/api/payment-screenshots/${user.paymentScreenshot}`, '_blank')}
                                                        onError={(e) => {
                                                            const localData = localStorage.getItem(`payment_screenshot_${user.id}`);
                                                            if (localData) {
                                                                const parsed = JSON.parse(localData);
                                                                e.target.src = parsed.base64;
                                                            } else {
                                                                e.target.style.display = 'none';
                                                                e.target.nextElementSibling.style.display = 'block';
                                                            }
                                                        }}
                                                    />
                                                    <div style={{display: 'none'}} className="flex items-center justify-center h-32 bg-neutral-100 rounded-lg">
                                                        <div className="text-center">
                                                            <ImageIcon className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                                                            <span className="text-neutral-500 text-sm">Screenshot not available</span>
                                                            <p className="text-xs text-neutral-400 mt-1">File: {user.paymentScreenshot}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs text-neutral-500">File: {user.paymentScreenshot}</span>
                                                        <button
                                                            onClick={() => window.open(`http://itvate.habeel.xyz/api/payment-screenshots/${user.paymentScreenshot}`, '_blank')}
                                                            className="text-xs text-primary hover:text-primary/80 flex items-center"
                                                        >
                                                            <ExternalLink className="w-3 h-3 mr-1" />
                                                            Open Full Size
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {/* Assessment Results */}
                            {user.assessmentResults && (
                                <div>
                                    <h3 className="text-lg font-semibold text-neutral-800 mb-4">Assessment Results</h3>
                                    <div className="bg-neutral-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <div className="text-2xl font-bold text-primary">{user.assessmentResults.percentage}%</div>
                                                <div className="text-sm text-neutral-600">Score</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {user.assessmentResults.score}/{user.assessmentResults.totalQuestions}
                                                </div>
                                                <div className="text-sm text-neutral-600">Correct</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-green-600">{user.assessmentResults.level}</div>
                                                <div className="text-sm text-neutral-600">Recommended</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Status Update Actions */}
                            <div>
                                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Update Payment Status</h3>
                                <div className="flex space-x-3">
                                    <Button
                                        onClick={() => handleStatusUpdate('verified')}
                                        disabled={updating}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Verify Payment
                                    </Button>
                                    <Button
                                        onClick={() => handleStatusUpdate('rejected')}
                                        disabled={updating}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Reject Payment
                                    </Button>
                                    <Button
                                        onClick={() => handleStatusUpdate('pending_verification')}
                                        disabled={updating}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                                    >
                                        <Clock className="w-4 h-4 mr-2" />
                                        Mark Pending
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [packageFilter, setPackageFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [stats, setStats] = useState({
        totalUsers: 0,
        pendingPayments: 0,
        verifiedPayments: 0
    });

    useEffect(() => {
        const isAuth = sessionStorage.getItem('admin_authenticated');
        const loginTime = sessionStorage.getItem('admin_login_time');
        if (isAuth && loginTime) {
            const timeDiff = Date.now() - parseInt(loginTime);
            if (timeDiff < 24 * 60 * 60 * 1000) {
                setIsAuthenticated(true);
                fetchUsers();
            } else {
                handleLogout();
            }
        }
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, searchTerm, statusFilter, packageFilter]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const usersData = [];
            querySnapshot.forEach((doc) => {
                usersData.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setUsers(usersData);
            calculateStats(usersData);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (usersData) => {
        const stats = {
            totalUsers: usersData.length,
            pendingPayments: usersData.filter(user => user.paymentStatus === 'pending_verification').length,
            verifiedPayments: usersData.filter(user => user.paymentStatus === 'verified').length
        };
        setStats(stats);
    };

    const filterUsers = () => {
        let filtered = users;
        if (searchTerm) {
            filtered = filtered.filter(user => 
                user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (statusFilter !== "all") {
            filtered = filtered.filter(user => user.paymentStatus === statusFilter);
        }
        if (packageFilter !== "all") {
            filtered = filtered.filter(user => user.selectedPackage === packageFilter);
        }
        setFilteredUsers(filtered);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin_authenticated');
        sessionStorage.removeItem('admin_login_time');
        setIsAuthenticated(false);
    };

    const handleUserStatusUpdate = (userId, newStatus) => {
        setUsers(prev => prev.map(user => 
            user.id === userId ? { ...user, paymentStatus: newStatus } : user
        ));
        calculateStats(users);
    };

    const handleUserDelete = (userId) => {
        setUsers(prev => prev.filter(user => user.id !== userId));
        setFilteredUsers(prev => prev.filter(user => user.id !== userId));
        calculateStats(users.filter(user => user.id !== userId));
    };

    const handleUserEdit = (userId, updatedFields) => {
        setUsers(prev => prev.map(user =>
            user.id === userId ? { ...user, ...updatedFields } : user
        ));
        setFilteredUsers(prev => prev.map(user =>
            user.id === userId ? { ...user, ...updatedFields } : user
        ));
    };

    const exportData = () => {
        const csvData = filteredUsers.map(user => ({
            'Name': `${user.firstName} ${user.lastName}`,
            'Email': user.email,
            'Phone': user.phoneNumber || 'N/A',
            'Package': user.selectedPackage || 'N/A',
            'Level': user.selectedLevel || 'N/A',
            'Option': user.selectedOption || 'N/A',
            'Payment Method': user.paymentMethod || 'N/A',
            'Transaction ID': user.transactionId || 'N/A',
            'Amount': user.paymentAmount || 'N/A',
            'Status': user.paymentStatus || 'N/A',
            'Joined Date': user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'
        }));
        const csvContent = [
            Object.keys(csvData[0] || {}).join(','),
            ...csvData.map(row => Object.values(row).join(','))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `itvate_registrations_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (!isAuthenticated) {
        return <AdminLogin onLogin={setIsAuthenticated} />;
    }

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-neutral-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Crown className="w-8 h-8 text-primary mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold text-neutral-800">Admin Panel</h1>
                                <p className="text-sm text-neutral-600">IT-vate Training Management System</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                onClick={fetchUsers}
                                variant="outline"
                                className="border-neutral-300"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refresh
                            </Button>
                            <Button
                                onClick={handleLogout}
                                className="bg-primary hover:bg-primary/90 text-white"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
            {/* Stats Dashboard */}
            <section className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon={<Users className="w-6 h-6 text-white" />}
                        color="bg-primary"
                    />
                    <StatsCard
                        title="Pending Payments"
                        value={stats.pendingPayments}
                        icon={<Clock className="w-6 h-6 text-white" />}
                        color="bg-yellow-600"
                    />
                    <StatsCard
                        title="Verified Payments"
                        value={stats.verifiedPayments}
                        icon={<CheckCircle className="w-6 h-6 text-white" />}
                        color="bg-green-600"
                    />
                </div>
                {/* Filters and Controls */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                                />
                            </div>
                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending_verification">Pending</option>
                                <option value="verified">Verified</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            {/* Package Filter */}
                            <select
                                value={packageFilter}
                                onChange={(e) => setPackageFilter(e.target.value)}
                                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="all">All Packages</option>
                                <option value="complete">Complete Training</option>
                                <option value="progressive">Progressive Path</option>
                                <option value="direct">Direct Entry</option>
                                <option value="special">Special Track</option>
                            </select>
                        </div>
                        <div className="flex space-x-3">
                            <Button
                                onClick={exportData}
                                variant="outline"
                                className="border-neutral-300"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Package
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-neutral-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                <span className="ml-2 text-neutral-600">Loading users...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-neutral-500">
                                            No users found matching the criteria
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-neutral-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-primary">
                                                                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-neutral-900">
                                                            {user.firstName} {user.lastName}
                                                        </div>
                                                        <div className="text-sm text-neutral-500">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {user.selectedPackage === "complete" ? (
                                                        user.selectedOption === "bundle" ? 
                                                            <Package className="w-4 h-4 text-primary mr-2" /> : 
                                                            <GraduationCap className="w-4 h-4 text-blue-600 mr-2" />
                                                    ) : user.selectedPackage === "progressive" ? (
                                                        <BookOpen className="w-4 h-4 text-green-600 mr-2" />
                                                    ) : user.selectedPackage === "direct" ? (
                                                        <Target className="w-4 h-4 text-orange-600 mr-2" />
                                                    ) : (
                                                        <User className="w-4 h-4 text-indigo-600 mr-2" />
                                                    )}
                                                    <div>
                                                        <div className="text-sm text-neutral-900 capitalize">
                                                            {user.selectedPackage || 'N/A'}
                                                        </div>
                                                        <div className="text-xs text-neutral-500">
                                                            {user.selectedLevel || user.selectedOption || 'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-neutral-900">
                                                    ₨{user.paymentAmount || 'N/A'}
                                                </div>
                                                <div className="text-xs text-neutral-500 capitalize">
                                                    {user.paymentMethod || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    user.paymentStatus === 'verified' ? 'bg-green-100 text-green-800' :
                                                    user.paymentStatus === 'pending_verification' ? 'bg-yellow-100 text-yellow-800' :
                                                    user.paymentStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-neutral-100 text-neutral-800'
                                                }`}>
                                                    {user.paymentStatus || 'pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                                {user.createdAt ? 
                                                    new Date(user.createdAt.seconds * 1000).toLocaleDateString() : 
                                                    'N/A'
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex space-x-2">
                                                <Button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setShowUserModal(true);
                                                    }}
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-primary border-primary hover:bg-primary/10"
                                                >
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    View
                                                </Button>
                                                <Button
                                                    onClick={async () => {
                                                        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
                                                        try {
                                                            await deleteDoc(doc(db, "users", user.id));
                                                            handleUserDelete(user.id);
                                                        } catch (error) {
                                                            alert("Failed to delete user");
                                                        }
                                                    }}
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 border-red-300 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Summary */}
                <div className="mt-6 text-center text-sm text-neutral-600">
                    Showing {filteredUsers.length} of {users.length} users
                </div>
            </section>
            {/* User Detail Modal */}
            <UserDetailModal
                user={selectedUser}
                isOpen={showUserModal}
                onClose={() => {
                    setShowUserModal(false);
                    setSelectedUser(null);
                }}
                onUpdateStatus={handleUserStatusUpdate}
                onDeleteUser={handleUserDelete}
                onEditUser={handleUserEdit}
            />
        </main>
    );
};

export default AdminPanel;
