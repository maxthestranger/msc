export default function Footer() {
    return (
        <footer className="w-full bg-white p-6 text-center">
            <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()}. MSC Software Engineering. All rights reserved
            </p>
        </footer>
    )
}
