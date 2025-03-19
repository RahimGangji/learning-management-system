import React from "react";

function CourseTile({ icon, description }) {
    return (
        <div className="bg-slate-400 px-2 py-2 flex space-x-2 justify-start items-center rounded-sm w-72">
            {icon}
            <p className="text-sm flex-1 text-white">{description}</p>
        </div>
    );
}

export default CourseTile;
