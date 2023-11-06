export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`mb-2.5 block text-black ` + className}>
            {value ? value : children}
        </label>
    );
}
