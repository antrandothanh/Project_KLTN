import React from "react";
import { IoHome, IoPeople, IoBriefcase} from "react-icons/io5";

export const EmployeeSidebarData = [
    {
        title: "Trang chủ",
        icon: <IoHome size={20} />,
        link: "/employee"
    },
    {
        title: "Điểm danh",
        icon: <IoPeople size={20} />,
        link: "/employee/attendance"
    },
    {
        title: "Xin nghỉ phép",
        icon: <IoBriefcase size={20} />,
        link: "/employee/absence"
    },
];