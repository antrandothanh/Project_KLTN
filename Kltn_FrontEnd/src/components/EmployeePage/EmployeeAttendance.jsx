import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Employee/EmployeeAttendance.module.css"
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";

function EmployeeAttendance() {
    const navigate = useNavigate();

    const handleOpenCameraForCheckIn = () => {
        navigate("/camera/checkin")
    };

    const handleOpenCameraForCheckOut = () => {
        navigate("/camera/checkout")
    };

    return (
        <div>
            <div className={styles.pageTitle}>Điểm danh</div>
            <div className={styles.buttonArea}>
                <div className={styles.buttonCheckInArea}>
                    <button onClick={handleOpenCameraForCheckIn} className={styles.buttonCheckIn}><IoLogInOutline size={20}/> Điểm danh đầu giờ</button>
                </div>
                <div className={styles.buttonCheckOutArea}>
                    <button onClick={handleOpenCameraForCheckOut} className={styles.buttonCheckOut}><IoLogOutOutline size={20}/> Điểm danh cuối giờ</button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeAttendance;