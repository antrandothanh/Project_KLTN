import React, { useState, useRef } from "react";
import styles from "../styles/SignIn.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoShieldCheckmark } from "react-icons/io5";
import { Modal } from "bootstrap";

const API = import.meta.env.VITE_API_URL;

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [signInError, setSignInError] = useState("");

  // Các trường thông tin đăng nhập
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignIn = async () => {
    try {

      // lấy giá trị từ các trường thông tin.
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      // Kiểm tra các trường đã được nhập hợp lệ không.
      if (email == null || email == "") {
        console.error("Email không được để trống");
        setSignInError("Email không được để trống");
        return;
      } else if (password == null || password == "") {
        console.error("Mật khẩu không được để trống");
        setSignInError("Mật khẩu không được để trống");
        return;
      } else if (isValidEmail(email) == false) {
        console.error("Email không hợp lệ");
        setSignInError("Email không hợp lệ");
        return;
      }

      // Nếu trường thông tin hợp lệ -> xoá lỗi cũ
      setSignInError("");

      // Gọi API đăng nhập
      const res = await axios.post(`${API}/auth/login`, {
        emailInput: email,
        passwordInput: password,
      });

      console.log("Email đã nhập vào:", email);
      console.log("Password đã nhập vào:", password);
      console.log("Response:", res.data);

      // Lưu access token vào session storage
      const accessToken = res.data.accessToken;
      sessionStorage.setItem("accessToken", accessToken);

      // Hiện modal thông báo đăng nhập thành công
      const modalEl = document.getElementById("staticBackdrop");
      const modal = new Modal(modalEl);
      modal.show();
    } catch (err) {
      const errorMessage = err.response.data.message;
      console.error("Xảy ra lỗi khi đăng nhập:", errorMessage);
      setSignInError(errorMessage);
    }

    //navigate("/manager/")
  };

  const handleNavigate = async () => {
    navigate("/manager");
  }

  return (
    <div className={styles.signInForm}>
      <div className={styles.title}>Đăng nhập</div>
      <div className={styles.inputSection}>
        <label>Email</label>
        <input type="email" ref={emailRef} />
      </div>
      <div className={styles.inputSection}>
        <label>Mật khẩu</label>
        <input type={showPassword ? "text" : "password"} ref={passwordRef} />
      </div>
      <div className={styles.showPasswordSection}>
        <input
          className="form-check-input"
          type="checkbox"
          checked={showPassword}
          onChange={handleShowPassword}
          id="checkDefault"
        />
        <label className="form-check-label" for="checkDefault">
          Hiện mật khẩu.
        </label>
      </div>
      <div className={styles.buttonSection}>
        <button onClick={handleSignIn}>Đăng nhập</button>
      </div>
      {signInError && <div className={styles.signInError}>{signInError}</div>}
      <div>
        Quên mật khẩu?{" "}
        <a className={styles.link} href="#">
          Ấn vào đây để khôi phục.
        </a>
      </div>

      {/* Modal */}
      <div
        className={`modal fade`}
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className={`modal-dialog modal-dialog-centered`}>
          <div className={`modal-content`}>
            <div className={`modal-header`}>
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Thông báo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <IoShieldCheckmark size={20} style={{ color: "green" }} /> Đăng nhập thành công.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleNavigate}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
