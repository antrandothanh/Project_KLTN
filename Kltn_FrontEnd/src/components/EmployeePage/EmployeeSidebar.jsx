import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Sidebar.module.css";
import { EmployeeSidebarData } from "./EmployeeSidebarData";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";

const API = import.meta.env.VITE_API_URL

function EmployeeSidebar() {
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            // Xoá access token trong session storage
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("userId")
            // Gọi API logout
            const res = await axios.delete(`${API}/auth/logout`);
            // Chuyển hướng sang trang đăng nhập
            navigate("/sign-in")
        }
        catch (err) {
            console.error("Xảy ra lỗi khi đăng xuất:", err)
        }
    }

    return (
        <div className={styles.Sidebar}>
            <div className={styles.header}>
                Trần Đỗ Thanh An
            </div>
            <ul className={styles.SidebarList}>
                {EmployeeSidebarData.map((val, key) => {
                    return <li
                        key={key}
                        onClick={() => { window.location.pathname = val.link }}
                        className={`${styles.Row} ${window.location.pathname === val.link ? styles.Active : ""}`}
                    >
                        <div className={styles.Icon}>
                            {val.icon}
                        </div>
                        <div className={styles.Title}>
                            {val.title}
                        </div>
                    </li>
                })}
            </ul>

            <div className={styles.Logout} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <div className={styles.Icon}>
                    <IoLogOut size={20} />
                </div>
                <div className={styles.Title}>
                    Đăng xuất
                </div>
            </div>

            {/* Modal */}
            <div className={`modal fade`} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className={`modal-dialog modal-dialog-centered`}>
                    <div className={`modal-content`}>
                        <div className={`modal-header`}>
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Xác nhận đăng xuất</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Bạn có muốn <span style={{ color: "red", fontWeight: 600 }}>đăng xuất</span>?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Không!</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleLogOut}>Đăng xuất</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeSidebar;