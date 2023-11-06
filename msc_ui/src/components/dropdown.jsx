import { useState, createContext, useContext, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import PropTypes from "prop-types";

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({ align = 'right', width = '48', contentClasses = 'py-1 bg-white', children }) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'origin-top-left left-0';
    } else if (align === 'right') {
        alignmentClasses = 'origin-top-right right-0';
    }

    let widthClasses = '';

    if (width === '48') {
        widthClasses = 'w-48';
    }

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div className={`flex flex-col gap-5 border-b border-stroke px-6 py-7.5 ` + contentClasses}>{children}</div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <a
            {...props}
            className={
                'flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base ' +
                className
            }
        >
            {children}
        </a>
    );
};

const DropdownButton = ({ className = '', children, ...props }) => {
    return (
        <button
            {...props}
            className={
                'flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base ' +
                className
            }
        >
            {children}
        </button>
    );
}

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
Dropdown.Button = DropdownButton;

export default Dropdown;


// prop validation
Dropdown.propTypes = {
    children: PropTypes.node.isRequired,
};

Trigger.propTypes = {
    children: PropTypes.node.isRequired,
};

Content.propTypes = {
    children: PropTypes.node.isRequired,
    align: PropTypes.string,
    width: PropTypes.string,
    contentClasses: PropTypes.string,
};

DropdownLink.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

DropdownButton.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}