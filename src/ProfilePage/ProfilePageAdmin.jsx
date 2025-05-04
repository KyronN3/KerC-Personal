import Style from './ProfilePageAdmin.module.css';
import Logo from '../assets/imgs/logo.png';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db, storage } from '../config/firebase.jsx';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { listAll, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import { Squash as Hamburger } from 'hamburger-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { v4 } from 'uuid';
import { ProfilePicContext } from '../context.jsx';
import {
    LogOut,
    User,
    ShoppingCart,
    Edit,
    Save,
    X,
    Phone,
    Mail,
    Home,
    Key,
    Shield,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfilePageAdmin = () => {

    const { currentProfilePic, setCurrentProfilePic } = useContext(ProfilePicContext);
    const [isOpen, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState();
    const navManageOrder = useNavigate();

    const [profile, setProfile] = useState({
        address: null,
        email: null,
        fname: null,
        isAdmin: null,
        lname: null,
        mobileNumber: null,
        password: null,
        passwordConfirm: null,
        profilePic: null,
        username: null
    });

    const [formData, setFormData] = useState({ ...profile });

    const handleEdit = () => {
        setIsEditing(true);
        setFormData({ ...profile });
    };

    const handleCancel = () => {
        navManageOrder(0);
        setImage(null);
        setIsEditing(false);
    };

    const handleSave = async () => {
        setProfile({ ...formData });
        await updateDoc(doc(db, 'Customer', auth?.currentUser?.uid), {
            ...formData
        })
        try {
            if (image != null) {
                //picture save
                const picName = ref(storage, `ProfilePicture/${image.name.concat(v4())}`)
                await uploadBytes(picName, image)
                updateDoc(doc(db, 'Customer', auth?.currentUser?.uid), {
                    profilePic: picName._location.path_
                })
                setIsEditing(false);
                navManageOrder(0);
            }
        } catch (err) {
            setIsEditing(false);
            console.error(err)
        }
    };

    useEffect(() => {
        const getPic = async () => {
            const getData = await getDoc(doc(db, 'Customer', auth?.currentUser?.uid));
            if (getData.exists()) {
                const data = getData.data();
                const response = await listAll(ref(storage, 'ProfilePicture'))
                const url = response.items.filter((pic) => {
                    return pic._location.path_ == data.profilePic;
                })
                url.forEach(async (pic) => {
                    const imageUrl = await getDownloadURL(pic);
                    setCurrentProfilePic(imageUrl);
                    console.log(imageUrl)
                })
            }
        }
        getPic();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const manageOrderNav = () => {
        navManageOrder('/admin');
    };

    const logout = async () => {
        await signOut(auth);
        window.location.replace("/");
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const dataFetch = await getDoc(doc(db, 'Customer', auth?.currentUser?.uid));
                const data = dataFetch.data();
                if (dataFetch.exists() && data.isAdmin) {
                    setProfile({
                        address: data.address,
                        email: data.email,
                        fname: data.fname,
                        isAdmin: data.isAdmin,
                        lname: data.lname,
                        mobileNumber: data.mobileNumber,
                        password: data.password,
                        passwordConfirm: data.passwordConfirm,
                        profilePic: data.profilePic,
                        username: data.username
                    })
                }
            } catch (err) { console.error(err) }
        }; getData();
    }, [])

    return (
        <>
            <nav className={Style.HeaderContainer}>
                <img className={Style.Image} src={Logo} alt="Logo" />
                <div className={Style.hamburger}>
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                </div>
                <div className={`${Style["nav-links"]} ${isOpen ? Style.active : ""}`}>
                    <Link to='/' onClick={() => { setOpen(false) }} className={Style.Home}>HOME</Link>
                    <Link to='/#about' onClick={() => { setOpen(false) }} className={Style.About}>ABOUT</Link>
                    <Link to='/#contact' onClick={() => { setOpen(false) }} className={Style.Contact}>CONTACTS</Link>
                    <a className={Style.Login}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className={Style.Profile}>
                                    <AvatarImage src={currentProfilePic || "https://github.com/shadcn.png"} />
                                    <AvatarFallback>...Loading</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 relative z-[1000] bg-[#f3c278]">
                                <DropdownMenuLabel className="text-center">Admin</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <User className="mr-2" />
                                        <span className='cursor-pointer'>Profile</span>
                                        <DropdownMenuShortcut>P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ShoppingCart className="mr-2" />
                                        <Link to='/admin' className='cursor-pointer' onClick={manageOrderNav}>Manage Orders</Link>
                                        <DropdownMenuShortcut>M</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <LogOut className="mr-2" />
                                    <span onClick={logout} className='cursor-pointer'>Log out</span>
                                    <DropdownMenuShortcut>Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </a>
                </div>
            </nav>

            {/* Profile Content */}
            <div className="min-h-screen bg-blue-100 p-4 md:p-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h1 className="text-2xl font-bold">User Profile</h1>
                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                <Edit size={18} className="mr-2" /> Edit Profile
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                                >
                                    <X size={18} className="mr-2" /> Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                >
                                    <Save size={18} className="mr-2" /> Save
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-6">
                        {/* Profile Image */}
                        <div className="mb-6 md:mb-0 flex flex-col items-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                                {profile.profilePic ? (
                                    <Avatar className={Style.UserProfile}>
                                        <AvatarImage src={imagePreview != null ? imagePreview : currentProfilePic || "https://github.com/shadcn.png"} />
                                        <AvatarFallback>...Loading</AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <Avatar className={Style.UserProfile}>
                                        <AvatarImage src={imagePreview || "https://github.com/shadcn.png"} />
                                        <AvatarFallback>...Loading</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                            {isEditing &&
                                <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm md:text-base">
                                    Upload Picture
                                    <input type="file" className="hidden" onChange={(e) => {
                                        if (e.target.files[0] && e.target.files) {
                                            const file = e.target.files[0];
                                            setImage(file);

                                            const imageUrl = URL.createObjectURL(file);
                                            setImagePreview(imageUrl);
                                        }
                                    }} />
                                </label>
                            }

                        </div>

                        {/* Profile Details */}
                        <div className="flex-1">
                            {isEditing ? (
                                // Edit Form
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2 text-sm font-medium">First Name</label>
                                        <input
                                            type="text"
                                            name="fname"
                                            value={formData.fname}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2 text-sm font-medium">Last Name</label>
                                        <input
                                            type="text"
                                            name="lname"
                                            value={formData.lname}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2 text-sm font-medium">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2 text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2 text-sm font-medium">Mobile Number</label>
                                        <input
                                            type="text"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2 text-sm font-medium">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2 text-sm font-medium">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2 text-sm font-medium">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="passwordConfirm"
                                            value={formData.passwordConfirm}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="flex items-center">
                                            <input
                                                readOnly
                                                type="checkbox"
                                                name="isAdmin"
                                                checked={formData.isAdmin}
                                                className="mr-2 h-5 w-5"
                                            />
                                            <span className="text-gray-700">Administrator Access</span>
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                // View Details
                                <div className="space-y-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="p-3 bg-gray-50 rounded flex items-start">
                                            <User className="mr-3 text-blue-500 mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <p className="text-xs md:text-sm text-gray-500">Full Name</p>
                                                <p className="font-medium text-sm md:text-base">{profile.fname} {profile.lname}</p>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-gray-50 rounded flex items-start">
                                            <Mail className="mr-3 text-blue-500 mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <p className="text-xs md:text-sm text-gray-500">Email</p>
                                                <p className="font-medium text-sm md:text-base break-all">{profile.email}</p>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-gray-50 rounded flex items-start">
                                            <User className="mr-3 text-blue-500 mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <p className="text-xs md:text-sm text-gray-500">Username</p>
                                                <p className="font-medium text-sm md:text-base">{profile.username}</p>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-gray-50 rounded flex items-start">
                                            <Phone className="mr-3 text-blue-500 mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <p className="text-xs md:text-sm text-gray-500">Mobile Number</p>
                                                <p className="font-medium text-sm md:text-base">{profile.mobileNumber}</p>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-gray-50 rounded flex items-start">
                                            <Home className="mr-3 text-blue-500 mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <p className="text-xs md:text-sm text-gray-500">Address</p>
                                                <p className="font-medium text-sm md:text-base">{profile.address}</p>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-gray-50 rounded flex items-start">
                                            <Key className="mr-3 text-blue-500 mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <p className="text-xs md:text-sm text-gray-500">Password</p>
                                                <p className="font-medium text-sm md:text-base">••••••</p>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-gray-50 rounded flex items-start col-span-1 md:col-span-2">
                                            <Shield className="mr-3 text-blue-500 mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <p className="text-xs md:text-sm text-gray-500">Access Level</p>
                                                <p className="font-medium text-sm md:text-base">{profile.isAdmin ? "Administrator" : "Regular User"}</p>
                                                {profile.isAdmin && (
                                                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                                        Admin privileges enabled
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default ProfilePageAdmin;