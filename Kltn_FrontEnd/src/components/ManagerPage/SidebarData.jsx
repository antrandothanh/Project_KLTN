import React from "react";
import { IoHome, IoPeople, IoBriefcase} from "react-icons/io5";

export const SidebarData = [
    {
        title: "Trang chủ",
        icon: <IoHome size={20} />,
        link: "/manager"
    },
    {
        title: "Nhân viên",
        icon: <IoPeople size={20} />,
        link: "/manager/employees"
    },
    {
        title: "Phòng ban",
        icon: <IoBriefcase size={20} />,
        link: "/manager/departments"
    },
];