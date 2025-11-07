import React from "react";
import styles from "../../styles/Employees.module.css";
import {IoSearch} from "react-icons/io5"

function Employees() {
    return (
        <div>
            <div className={styles.pageTitle}>Quản lý nhân viên</div>
            <div className={`row ${styles.searchSection}`}>
                <div className={`input-group input-group-sm mb-3 col`}>
                    <span className={`input-group-text`} id="inputGroup-sizing-sm">Họ tên</span>
                    <input type="text" className={`form-control`} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className={`input-group input-group-sm mb-3 col`}>
                    <span className={`input-group-text`} id="inputGroup-sizing-sm">Mã số</span>
                    <input type="text" className={`form-control`} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
            </div>
            <div className={`mb-3`}>
                <button type="button" className={`btn btn-primary btn-sm`}><IoSearch size={20}/> Tìm kiếm</button>
            </div>
            <div></div>
            <div className={`table-responsive ${styles.tableSection}`}>
                <table className={`table table-hover`}>
                    <thead>
                        <tr>
                            <th className={styles.cellWidth100px}>Id</th>
                            <th className={styles.cellWidth200px}>Họ tên</th>
                            <th className={styles.cellWidth200px}>Chức vụ</th>
                            <th className={styles.cellWidth200px}>Phòng ban</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trần Đỗ Thanh An</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Quản lí</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trí tuệ nhân tạo và học máy</td>
                        </tr>

                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trần Đỗ Thanh An</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Quản lí</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trí tuệ nhân tạo và học máy</td>
                        </tr>

                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trần Đỗ Thanh An</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Quản lí</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trí tuệ nhân tạo và học máy</td>
                        </tr>

                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trần Đỗ Thanh An</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Quản lí</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trí tuệ nhân tạo và học máy</td>
                        </tr>

                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trần Đỗ Thanh An</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Quản lí</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trí tuệ nhân tạo và học máy</td>
                        </tr>

                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trần Đỗ Thanh An</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Quản lí</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trí tuệ nhân tạo và học máy</td>
                        </tr>

                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trần Đỗ Thanh An</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Quản lí</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trí tuệ nhân tạo và học máy</td>
                        </tr>

                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trần Đỗ Thanh An</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Quản lí</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trí tuệ nhân tạo và học máy</td>
                        </tr>

                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trần Đỗ Thanh An</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Quản lí</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trí tuệ nhân tạo và học máy</td>
                        </tr>

                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trần Đỗ Thanh An</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Quản lí</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Trí tuệ nhân tạo và học máy</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default Employees;