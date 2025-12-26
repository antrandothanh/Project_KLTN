import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Employees.module.css";
import { IoSearch, IoCheckmarkCircle } from "react-icons/io5";
import axios from "axios";
import { Modal } from "bootstrap";

const API = import.meta.env.VITE_API_URL;

function Employees() {
    // Trường thông tin nhập vào
    const [dob, setDob] = useState(null);
    const fullNameInputRef = useRef("")
    const emailInputRef = useRef("")
    const dobInputRef = useRef("")
    const addressInputRef = useRef("")
    const positionInputRef = useRef("")
    const departmentIdInputRef = useRef("")
    const employeeCodeInputRef = useRef("")
    const passwordInputRef = useRef("")

    // Trường thông tin tìm kiếm
    const fullNameSearchInputRef = useRef("")
    const employeeCodeSearchInputRef = useRef("")


    // Lưu trữ các phòng ban
    const [departments, setDepartments] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchDepartments()
        fetchEmployees()
    }, [])

    // Định dạng format của ngày sinh
    const handleChangeDob = (e) => {
        const value = e.target.value;
        if (!value) return;
        setDob(value);
        const [year, month, day] = value.split("-");
        const formatted = `${year}-${month}-${day}`;
        setDob(formatted);
    };

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

    // Fetch tất cả nhân viên
    const fetchEmployees = async () => {
        try {
            // Tạo access token mới (nếu cần thiết)
            const newAccessToken = await generateNewAccessToken()
            const res = await axios.get(
                `${API}/users`,
                {
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`
                    }
                }
            )
            const employeesFromDB = res.data
            console.log("Employees from DB:", employeesFromDB)
            setUsers(employeesFromDB)
        } catch (err) {
            console.error("Lỗi không thể fetch các nhân viên từ database:", err)
        }
    }

    const handleAddNewEmployee = async () => {
        try {
            // Lấy thông tin từ trường đăng nhập
            const fullNameInput = fullNameInputRef.current.value
            const emailInput = emailInputRef.current.value
            const dobInput = dobInputRef.current.value
            const addressInput = addressInputRef.current.value
            const positionInput = positionInputRef.current.value
            const departmentIdInput = departmentIdInputRef.current.value
            const employeeCodeInput = employeeCodeInputRef.current.value
            const passwordInput = passwordInputRef.current.value

            const fullName = fullNameInput?.trim()
            const email = emailInput?.trim()
            const dob = dobInput?.trim()
            const address = addressInput?.trim()
            const position = positionInput?.trim()
            const departmentId = departmentIdInput?.trim()
            const employeeCode = employeeCodeInput?.trim()
            const password = passwordInput?.trim()

            // Tạo access token mới (nếu cần thiết)
            const newAccessToken = await generateNewAccessToken()

            if (fullName && email && dob && address && position && departmentId && employeeCode && password) {
                const newEmployeeReq = {
                    employeeCode: employeeCode,
                    fullName: fullName,
                    email: email,
                    dob: dob,
                    address: address,
                    position: position,
                    departmentId: departmentId,
                    faceEnrolled: 0,
                    password: password
                }

                const res = await axios.post(
                    `${API}/users`,
                    newEmployeeReq,
                    {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`
                        }
                    }
                )

                console.log("Response:", res.data)

                // Tạo model thông báo thành công
                const modalAddNewEmployeeSuccessNotificationEl = document.getElementById("addNewEmployeeSuccessNotification")
                new Modal(modalAddNewEmployeeSuccessNotificationEl).show()
            } else {
                console.log("Thông tin chưa được nhập đầy đủ")
            }

        } catch (err) {
            console.error("Lỗi khi tạo nhân viên mới:", err)
        }
    }

    const handleSearchEmployee = async () => {
        try {
            const fullNameSearchInput = fullNameSearchInputRef.current.value
            const employeeCodeSearchInput = employeeCodeSearchInputRef.current.value

            const fullName = fullNameSearchInput?.trim().toLowerCase()
            const employeeCode = employeeCodeSearchInput?.trim().toLowerCase()

            console.log("Full name:", fullName)
            console.log("Employee code:", employeeCode)

            if (!fullName && !employeeCode) {
                fetchEmployees()
            } else {
                const result = users.filter(u => (
                    (!fullName || u.full_name.toLowerCase().includes(fullName)) && 
                    (!employeeCode || u.employee_code.toLowerCase().includes(employeeCode)) 
                ))
                setUsers(result)
            }
        } catch (err) {
            console.error("Lỗi khi tìm kiếm nhân viên:", err)
        }
    }

    return (
        <div>
            <div className={styles.pageTitle}>Quản lý nhân viên</div>
            <div className={`row ${styles.searchSection}`}>
                <div className={`input-group input-group-sm mb-3 col`}>
                    <span className={`input-group-text`} id="inputGroup-sizing-sm">Họ tên</span>
                    <input ref={fullNameSearchInputRef} type="text" className={`form-control`} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className={`input-group input-group-sm mb-3 col`}>
                    <span className={`input-group-text`} id="inputGroup-sizing-sm">Mã số</span>
                    <input ref={employeeCodeSearchInputRef} type="text" className={`form-control`} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
            </div>
            <div className={`mb-3 d-flex`}>
                <div className={`me-2`}>
                    <button onClick={handleSearchEmployee} type="button" className={`btn btn-primary btn-sm ${styles.buttonWidth}`}><IoSearch size={20} />Tìm kiếm</button>
                </div>
                <div>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#addNewUser" className={`btn btn-success btn-sm ${styles.buttonWidth}`}><IoSearch size={20} />Thêm nhân viên</button>
                </div>
            </div>
            <div></div>
            <div className={`table-responsive ${styles.tableSection}`}>
                <table className={`table table-hover`}>
                    <thead>
                        <tr>
                            <th className={styles.cellWidth100px}>Mã</th>
                            <th className={styles.cellWidth200px}>Họ tên</th>
                            <th className={styles.cellWidth200px}>Chức vụ</th>
                            <th className={styles.cellWidth200px}>Phòng ban</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td className={`text-truncate ${styles.cellWidth100px}`}>{u.employee_code}</td>
                                <td className={`text-truncate ${styles.cellWidth200px}`}>{u.full_name}</td>
                                <td className={`text-truncate ${styles.cellWidth200px}`}>{u.position}</td>
                                <td className={`text-truncate ${styles.cellWidth200px}`}>{departments.find(d => d.id === u.department_id)?.name || "Không có phòng ban"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <div className={`modal fade`} id="addNewUser" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${styles.modelStyle}`}>
                    <div className={`modal-content`}>
                        <div className={`modal-header`}>
                            <h1 className={`modal-title fs-5`} id="staticBackdropLabel">Thêm nhân viên</h1>
                            <button type="button" className={`btn-close`} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className={`modal-body`}>
                            <div className={`mb-3`}>
                                <label htmlFor="fullname" className={`form-label`}>Họ và tên</label>
                                <input ref={fullNameInputRef} type="text" className={`form-control`} id="fullname" />
                            </div>

                            <div className={`mb-3`}>
                                <label htmlFor="email" className={`form-label`}>Email</label>
                                <input ref={emailInputRef} type="text" className={`form-control`} id="email" />
                            </div>

                            <div className={`mb-3`}>
                                <label htmlFor="dob" className={`form-label`}>Ngày sinh</label>
                                <input ref={dobInputRef} type="date" className={`form-control`} id="dob" />
                            </div>

                            <div className={`mb-3`}>
                                <label htmlFor="address" className={`form-label`}>Nơi ở</label>
                                <input ref={addressInputRef} type="text" className={`form-control`} id="address" />
                            </div>

                            <div className={`mb-3`}>
                                <label htmlFor="position" className={`form-label`}>Chức danh</label>
                                <input ref={positionInputRef} type="text" className={`form-control`} id="position" />
                            </div>

                            <div className={`mb-3`}>
                                <label htmlFor="departmentSelect" className={`form-label`}>Phòng ban</label>
                                <select
                                    ref={departmentIdInputRef}
                                    defaultValue=""
                                    className={`form-select`}
                                    id="departmentSelect"
                                >
                                    <option value="" disabled>Chọn phòng ban...</option>
                                    {departments.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={`mb-3`}>
                                <label htmlFor="employeeCode" className={`form-label`}>Mã nhân viên</label>
                                <input ref={employeeCodeInputRef} type="text" className={`form-control`} id="employeeCode" />
                            </div>

                            <div className={`mb-3`}>
                                <label htmlFor="password" className={`form-label`}>Mật khẩu</label>
                                <input ref={passwordInputRef} type="text" className={`form-control`} id="password" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                            <button onClick={handleAddNewEmployee} type="button" className="btn btn-success" data-bs-dismiss="modal">Thêm</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal thông báo tạo nhân viên mới thành công */}
            <div
                className={`modal fade`}
                id="addNewEmployeeSuccessNotification"
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
                            <IoCheckmarkCircle size={20} style={{ color: "green" }} /> Thêm nhân viên thành công.
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
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

export default Employees;