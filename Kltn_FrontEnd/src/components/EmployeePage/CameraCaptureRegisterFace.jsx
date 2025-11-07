import React, { useCallback, useState, useRef } from "react";
import Webcam from "react-webcam";
import styles from "../../styles/Employee/CameraCapture.module.css"
import { IoArrowBackOutline, IoCameraOutline } from "react-icons/io5";
import axios from "axios";

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
};

function CameraCaptureRegisterFace() {
    const [cap, setCap] = useState('')
    const webcamRef = useRef(null);
    
    // const capture = useCallback(
    //     () => {
    //         const imageSrc = webcamRef.current.getScreenshot();
    //         setCap(imageSrc)
    //         console.log(imageSrc)
    //     },
    //     [webcamRef]
    // );

    const capture = async () => {
        try {
            const username = 'tuan';
            const imagesList = [];
            for (let i = 0; i < 10; i++) {
                const imageSrc = webcamRef.current.getScreenshot();
                imagesList.push(imageSrc);
                // chờ 1000ms giữa mỗi lần chụp để camera bắt kịp
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            console.log(imagesList);
            const res = await axios.post('http://127.0.0.1:9999/capture-face', {
                username: username,
                images_base64: imagesList,
            });
        } catch (error) {
            console.error("Error while send images to api: ", error);
        }

        alert("Đã chụp và gửi xong 10 ảnh!");
    };

    return (
        <div className={styles.contentArea}>
            <div className={styles.pageTitle}>
                Đăng ký khuôn mặt
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
                <button className={styles.buttonCapture} onClick={capture}><IoCameraOutline size={30} /> Đăng ký khuôn mặt</button>
            </div>
            <div className={styles.buttonCaptureArea}>
                <button className={styles.buttonBack} ><IoArrowBackOutline size={20} /> Quay lại</button>
            </div>
            <div className={styles.webcamArea}>
                <img src={cap} />
            </div>
        </div>
    );
}

export default CameraCaptureRegisterFace;