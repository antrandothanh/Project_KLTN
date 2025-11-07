import React, { useCallback, useState, useRef } from "react";
import Webcam from "react-webcam";
import styles from "../../styles/Employee/CameraCapture.module.css"
import { IoArrowBackOutline, IoCameraOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
};

function CameraCaptureFaceAttendance() {
    const [cap, setCap] = useState('')
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const capture = async () => {
        try {
            const username = 'Ngoai';
            const imageSrc = webcamRef.current.getScreenshot();
            const res = await axios.post("http://127.0.0.1:9999/checkin", {
                image_base64: imageSrc,
            });
            console.log(res.data);
        } catch (error) {
            console.error("Error while capture face: ", error)
        }
    }

    const handleGoBack = async () => {
        navigate('/employee/attendance');
    }

    return (
        <div className={styles.contentArea}>
            <div className={styles.pageTitle}>
                Điểm danh khuôn mặt
            </div>
            <div className={styles.instructionArea}>
                Ngồi ngay ngắn. Để khuôn mặt vào chính giữa khung ảnh. <br /> Tháo mắt kính, khẩu trang khi chụp ảnh.
            </div>
            <div className={styles.webcamArea}>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    height={400}
                    width={400}
                    videoConstraints={videoConstraints}
                />
            </div>
            <div className={styles.buttonCaptureArea}>
                <button className={styles.buttonCapture} onClick={capture}><IoCameraOutline size={30} /> Điểm danh</button>
            </div>
            <div className={styles.buttonCaptureArea}>
                <button className={styles.buttonBack} onClick={handleGoBack} ><IoArrowBackOutline size={20} /> Quay lại</button>
            </div>
            <div className={styles.webcamArea}>
                <img src={cap} />
            </div>
        </div>
    );
}

export default CameraCaptureFaceAttendance;