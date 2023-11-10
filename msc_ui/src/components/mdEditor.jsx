import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';

export default function MdEditor({value, onChange}) {
    return (
        <div className="w-full border border-gray rounded focus:outline-none focus:border-primary transition-colors duration-200">
            <MDEditor
                value={value}
                onChange={onChange}
                name="course_description"
            />
        </div>
    );
}