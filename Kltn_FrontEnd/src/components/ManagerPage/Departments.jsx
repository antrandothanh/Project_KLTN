import React from "react";
import styles from "../../styles/Departments.module.css";
import {IoSearch} from "react-icons/io5"

function Departments() {
    return (
        <div>
            <div className={styles.pageTitle}>Quản lý phòng ban</div>
            <div className={`row ${styles.searchSection}`}>
                <div className={`input-group input-group-sm mb-3 col`}>
                    <span className={`input-group-text`} id="inputGroup-sizing-sm">Tên phòng ban</span>
                    <input type="text" className={`form-control`} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className={`input-group input-group-sm mb-3 col`}>
                    <span className={`input-group-text`} id="inputGroup-sizing-sm">Mã số</span>
                    <input type="text" className={`form-control`} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
            </div>
            <div className={`mb-3`}>
                <button type="button" className={`btn btn-primary btn-sm`}><IoSearch size={20} /> Tìm kiếm</button>
            </div>
            <div></div>
            <div className={`table-responsive ${styles.tableSection}`}>
                <table className={`table table-hover`}>
                    <thead>
                        <tr>
                            <th className={styles.cellWidth100px}>Mã số</th>
                            <th className={styles.cellWidth200px}>Tên phòng ban</th>
                            <th className={styles.cellWidth200px}>Số lượng nhân viên</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Phòng nhân sự</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>50</td>
                        </tr>
                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Phòng công nghệ thông tin</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>10</td>
                        </tr>
                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Phòng nhân sự</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>50</td>
                        </tr>
                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Phòng công nghệ thông tin</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>10</td>
                        </tr>
                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Phòng nhân sự</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>50</td>
                        </tr>
                        <tr>
                            <th className={`text-truncate ${styles.cellWidth100px}`}>1</th>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>Phòng công nghệ thông tin</td>
                            <td className={`text-truncate ${styles.cellWidth200px}`}>10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Departments;