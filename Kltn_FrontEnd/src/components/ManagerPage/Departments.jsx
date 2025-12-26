import React, { useRef, useState, useEffect } from "react";
import styles from "../../styles/Departments.module.css";
import { IoSearch, IoCheckmarkCircle } from "react-icons/io5"
import axios from "axios";
import { Modal } from "bootstrap";


const API = import.meta.env.VITE_API_URL;

function Departments() {

    // Lưu trữ các phòng ban
    const [departments, setDepartments] = useState([])

    // Trường tìm kiếm thông tin
    const departmentNameInputRef = useRef("")
    const departmentCodeInputRef = useRef("")

    // Thông tin tạo phòng ban
    const departmentNameRef = useRef("")
    const departmentCodeRef = useRef("")

    useEffect(() => {
        fetchDepartments()
    }, [])

    // Tạo access token
    const generateNewAccessToken = async () => {
        // tạo biến lưu access token
        let newAccessToken = ""
        // Lấy access token từ session storage
        const accessToken = sessionStorage.getItem("accessToken");
        newAccessToken = accessToken
        // Lấy user id từ session storage
        const userId = sessionStorage.getItem("userId")
        // Kiểm tra token còn hạn sử dụng hay không
        if (isTokenExpired(newAccessToken)) {
            // gọi api lấy refresh token thông qua user id
            const refreshTokenRes = await axios.post(`${API}/auth/get-refresh-token`, {
                userId: userId
            })
            const refreshToken = refreshTokenRes.data.refreshToken
            // Gọi api để refresh token
            const accessTokenRes = await axios.post(`${API}/auth/refresh-token`, {
                token: refreshToken
            })
            newAccessToken = accessTokenRes.data.accessToken
            return newAccessToken
        } else {
            return newAccessToken
        }
    }

    // Fetch tất cả phòng ban từ DB
    const fetchDepartments = async () => {
        try {
            // Tạo access token mới (nếu cần thiết)
            const newAccessToken = await generateNewAccessToken()
            const res = await axios.get(
                `${API}/departments`,
                {
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`
                    }
                }
            )
            const departmentsFromDB = res.data
            setDepartments(departmentsFromDB)
        } catch (err) {
            console.error("Lỗi không thể fetch phòng ban từ database:", err)
        }
    }

    // Kiểm tra token có còn hạn sử dụng
    const isTokenExpired = (token) => {
        if (!token) return true;

        const payload = JSON.parse(atob(token.split(".")[1]));
        const exp = payload.exp * 1000; // exp tính bằng giây

        if (Date.now() > exp) {
            return true
        } else {
            return false
        }
    }

    const handleCreateDepartment = async () => {
        try {
            // Lấy giá trị nhập vào từ người dùng
            const departmentName = departmentNameRef.current.value
            const departmentCode = departmentCodeRef.current.value
            //Kiểm tra lấy giá trị thành công
            if (departmentName != null && departmentName != "" && departmentCode != null && departmentCode != "") {
                const newAccessToken = await generateNewAccessToken()
                // Gọi API tạo phòng ban
                const res = await axios.post(`${API}/departments`,
                    {
                        name: departmentName,
                        departmentCode: departmentCode,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    })
                console.log("Tạo phòng thành công:", res.data)

                // Đóng modal form tạo phòng
                const modalAddNewDepartmentEl = document.getElementById("addNewDepartment")
                Modal.getInstance(modalAddNewDepartmentEl)?.hide();

                // Hiện modal thông báo tạo phòng ban thành công
                const modalCreateDepartmentSuccessNotificationEl = document.getElementById("createDepartmentSuccessNotification");
                new Modal(modalCreateDepartmentSuccessNotificationEl).show();

            } else {
                console.log("Chưa lấy được thông tin")
            }
        } catch (err) {
            console.error("Xảy ra lỗi khi tạo phòng ban:", err.response)
        }
    }

    const updateTable = () => {
        try {
            fetchDepartments()
        } catch (err) {
            console.error("Lỗi khi cập nhật lại danh sách phòng ban:", err)
        }
    }

    const handleSearchDepartment = () => {
        try {
            // Lấy trường thông tin nhập vào
            const departmentName = departmentNameInputRef.current.value
            const departmentCode = departmentCodeInputRef.current.value

            // Viết thường và xoá khoảng trắng đầu, cuối chuỗi
            const name = departmentName?.trim().toLowerCase()
            const code = departmentCode?.trim().toLowerCase()

            if (!name && !code) {
                fetchDepartments()
            } else {
                // result là một cái mảng
                const result = departments.filter(d => (
                    (!name || d.name.toLowerCase().includes(name)) &&
                    (!code || d.department_code.toLowerCase().includes(code))
                ))
                setDepartments(result)
            }

        } catch (err) {
            console.error("Lỗi khi tìm kiếm:", err)
        }
    }

    return (
        <div>
            <div className={styles.pageTitle}>Quản lý phòng ban</div>
            <div className={`row ${styles.searchSection}`}>
                <div className={`input-group input-group-sm mb-3 col`}>
                    <span className={`input-group-text`} id="inputGroup-sizing-sm">Tên phòng ban</span>
                    <input ref={departmentNameInputRef} type="text" className={`form-control`} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className={`input-group input-group-sm mb-3 col`}>
                    <span className={`input-group-text`} id="inputGroup-sizing-sm">Mã số</span>
                    <input ref={departmentCodeInputRef} type="text" className={`form-control`} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
            </div>
            <div className={`mb-3 d-flex`}>
                <div className={`me-2`}>
                    <button onClick={handleSearchDepartment} type="button" className={`btn btn-primary btn-sm ${styles.buttonWidth}`}><IoSearch size={20} />Tìm kiếm</button>
                </div>
                <div>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addNewDepartment" className={`btn btn-success btn-sm ${styles.buttonWidth}`}><IoSearch size={20} />Thêm phòng ban</button>
                </div>
            </div>
            <div></div>
            <div className={`table-responsive ${styles.tableSection}`}>
                <table className={`table table-hover`}>
                    <thead>
                        <tr>
                            <th className={styles.cellWidth200px}>Tên phòng ban</th>
                            <th className={styles.cellWidth200px}>Mã phòng ban</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dep) => (
                            <tr key={dep.id}>
                                <td className={`text-truncate ${styles.cellWidth200px}`}>{dep.name}</td>
                                <td className={`text-truncate ${styles.cellWidth200px}`}>{dep.department_code}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <div className={`modal fade`} id="addNewDepartment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${styles.modelStyle}`}>
                    <div className={`modal-content`}>
                        <div className={`modal-header`}>
                            <h1 className={`modal-title fs-5`} id="staticBackdropLabel">Tạo phòng ban</h1>
                            <button type="button" className={`btn-close`} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className={`modal-body`}>
                            <div className={`mb-3`}>
                                <label htmlFor="department" className={`form-label`}>Tên phòng ban</label>
                                <input type="text" className={`form-control`} id="department" ref={departmentNameRef} />
                            </div>

                            <div className={`mb-3`}>
                                <label htmlFor="description" className={`form-label`}>Mã phòng ban</label>
                                <textarea className="form-control" id="description" rows="3" ref={departmentCodeRef}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleCreateDepartment}>Thêm</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal thông báo tạo phòng thành công */}
            <div
                className={`modal fade`}
                id="createDepartmentSuccessNotification"
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
                            <IoCheckmarkCircle size={20} style={{ color: "green" }} /> Tạo phòng thành công.
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                                onClick={updateTable}
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

export default Departments;