import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetAllUSerQuery,
  useTotalUserQuery,
} from "../../rtkQueries/UserApi";
import { logout } from "../../slices/AuthSlice";
import Pagination from "react-responsive-pagination";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [serialNo, setSerialNo] = useState(0);
  const [sortBtn, setSortBtn] = useState(false);
  const [searchText, setSearchText] = useState("");

  const pageSize = 10;

  const { data, isLoading, isFetching, isError, isSuccess, error } =
    useGetAllUSerQuery(
      sortBtn
        ? {
            initialEntry: serialNo,
            finalEntry: serialNo + 10,
            orderType: "desc",
            searchText:searchText

          }
        : {
            initialEntry: serialNo,
            finalEntry: serialNo + 10,
            orderType: "asc",
            searchText:searchText
          }
    );
  const { data: totalData } = useTotalUserQuery();

  const totalPages = Math.ceil(totalData?.length / pageSize);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("User logout successfully");
    navigate("/");
  };
  const handlePagination = (page: any) => {
    setCurrentPage(page);
    if (page === 1) {
      setSerialNo(0);
    } else {
      setSerialNo(pageSize * page - pageSize);
    }
  };
  const handleSort = () => {
    setSortBtn(!sortBtn);
  };
  useEffect(() => {
    if (sortBtn) {
      toast.success("Data sorted successfully in descending order");
    }
  }, [sortBtn]);
  console.log("searchText", searchText);

  return (
    <div>
      <div className="d-flex min-vh-100 flex-column justify-content-center align-items-start">
        <div className="d-flex gap-3 w-100 justify-content-center align-items-center my-4">
          <Button>Add user</Button>
          <Form.Group className="mb-0" controlId="formBasicEmail">
            <Form.Control
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="search title"
            />
          </Form.Group>
        </div>
        {isLoading || isFetching ? (
          <div className="d-flex justify-content-center align-items-center h-100 w-100 min-vh-100">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        ) : isError || error ? (
          <h1 className="text-align-center">something went wrong</h1>
        ) : isSuccess && data ? (
          <>
            <Table striped bordered hover responsive>
              <thead>
                <tr style={{ cursor: "pointer" }} onClick={handleSort}>
                  <th>S.no</th>
                  <th>User Id</th>
                  <th>Title</th>
                  <th>Body</th>
                  {/* <th>Body</th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, index: any) => (
                  <tr key={index}>
                    <td>
                      {currentPage === 1 && sortBtn
                        ? totalData?.length - index
                        : currentPage && sortBtn
                        ? totalData?.length +
                          pageSize -
                          pageSize * currentPage -
                          index
                        : currentPage === 1
                        ? index + 1
                        : currentPage * pageSize - pageSize + 1 + index}
                    </td>
                    <td>{item.userId}</td>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                    {/* <td>@mdo</td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end w-100">
              <Pagination
                current={currentPage}
                total={totalPages}
                onPageChange={(page) => handlePagination(page)}
              />
            </div>
          </>
        ) : null}
      </div>
      {/* <Button onClick={handleLogout}>Logout</Button>
      <div className="d-flex justify-content-center">
        <Button onClick={() => navigate("/dashboard/info")}>Info page</Button>
      </div> */}
    </div>
  );
};

export default Dashboard;
