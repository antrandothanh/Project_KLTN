import React from "react";
import styles from "../../styles/Departments.module.css";
import { IoSearch } from "react-icons/io5"

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
            <div className={`mb-3 d-flex`}>
                <div className={`me-2`}>
                    <button type="button" className={`btn btn-primary btn-sm ${styles.buttonWidth}`}><IoSearch size={20} />Tìm kiếm</button>
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

            {/* Modal */}
            <div className={`modal fade`} id="addNewDepartment" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${styles.modelStyle}`}>
                    <div className={`modal-content`}>
                        <div className={`modal-header`}>
                            <h1 className={`modal-title fs-5`} id="staticBackdropLabel">Thêm nhân viên</h1>
                            <button type="button" className={`btn-close`} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className={`modal-body`}>
                            <div className={`mb-3`}>
                                <label for="department" className={`form-label`}>Tên phòng ban</label>
                                <input type="text" className={`form-control`} id="department" />
                            </div>

                            <div className={`mb-3`}>
                                <label for="description" className={`form-label`}>Mô tả</label>
                                <textarea class="form-control" id="description" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                            <button type="button" class="btn btn-success">Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Departments;