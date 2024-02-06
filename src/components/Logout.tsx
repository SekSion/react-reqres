
const Logout = () => {
    const logout = () => {
        window.location.href = "/";
    }

    return (
        <button
            className="p-2 ml-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md"
            onClick={logout}
        >
            Logout
        </button>
    );
};

export default Logout;
