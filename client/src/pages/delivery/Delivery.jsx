import React, { useContext, useEffect, useRef, useState } from "react";
import { authApi, endpoints } from "../../configs/ApiConfig";
import { UserContext } from "../../App";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import { Form, Modal } from "react-bootstrap";
import { Box, Button, InputBase, Typography } from "@mui/material";
// import { Link } from "@mui/material";

const Delivery = () => {
  const [user] = useContext(UserContext);
  const [orders, setOrders] = useState(null);
  const [ordersId, setOrderId] = useState(null);
  const [cusLastName, setCusLastName] = useState("");
  const [cusFirstName, setCusFirstName] = useState("");
  const [cusPhone, setCusPhone] = useState(null);
  const [cusAddress, setCusAddress] = useState(null);
  const [cusOrders, setCusOrders] = useState(null);

  const nav = useNavigate();


  const [image, setImage] = useState({
    files: [],
  });

  const files = useRef();

  const [showDetailModal, setShowDetailModal] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#38b6ff",
      color: theme.palette.common.white,
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const openDetailModal = (orders) => {
    setShowDetailModal(true);
    setOrderId(orders.id);
    setCusLastName(orders.user.profile.lastName);
    setCusFirstName(orders.user.profile.firstName);
    setCusPhone(orders.user.profile.phone);
    setCusAddress(orders.address);
    setCusOrders(orders.donateItem);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  const handleImageUpload = (event) => {
    const selectedImages = event.target.files;
    const imageArray = Array.from(selectedImages);
    console.log(imageArray);
    setImage((current) => ({
      ...current,
      files: current.files.concat(imageArray),
    }));
  };

  const updateOrders = (event) => {
    event.preventDefault();

    const process = async () => {
      let formData = new FormData();

      image.files.forEach((image, index) => {
        formData.append(`files[${index}]`, image);
      });

      if (image.files.length > 0)
        for (let i = 0; i < image.files.length; i++) {
          formData.append("files", image.files[i]);
        }

      try {
        const res = await authApi().put(
          endpoints["transport"](ordersId),
          formData
        );

        setShowDetailModal(false);
        nav("/delivery");
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    process();
  };
  useEffect(() => {
    const loadOrders = async () => {
      const res = await authApi().get(endpoints["transport"](user.id));
      setOrders(res.data);
      console.log(res.data);
    };

    loadOrders();
  }, [showDetailModal]);

  return (
    <>
      <h1 className="form-heading">ĐƠN VẬN CHUYỂN</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Mã đơn hàng</StyledTableCell>
              <StyledTableCell>Khách hàng</StyledTableCell>
              <StyledTableCell>Tên hàng</StyledTableCell>
              <StyledTableCell>Xem chi tiết</StyledTableCell>
              {/* <StyledTableCell >Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.map((orders) => (
                <StyledTableRow key={orders.name}>
                  <StyledTableCell component="th" scope="row">
                    {orders.id}
                  </StyledTableCell>
                  <StyledTableCell>{orders.user.profile.lastName} {orders.user.profile.firstName}</StyledTableCell>
                  <StyledTableCell>{orders.donateItem}</StyledTableCell>
                  <StyledTableCell>
                    <Link onClick={() => openDetailModal(orders)}>
                      Xem chi tiết
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal show={showDetailModal} onHide={closeDetailModal}>
        <Modal.Header closeButton>
          <div className="text-xl text-center font-bold">
            Xử lý đơn hàng {ordersId}
          </div>
        </Modal.Header>
        <Modal.Body>
          <Box
            style={{ padding: 0 }}
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="d-flex align-items-center">
                      Tên người nhận:
                    </label>
                    <Typography>{cusLastName} {cusFirstName}</Typography>
                  </div>
                  <div className="form-group">
                    <label className="d-flex align-items-center">
                      Số điện thoại:
                    </label>
                    <Typography>{cusPhone}</Typography>
                  </div>
                  <div className="form-group">
                    <label className="d-flex align-items-center">
                      Địa chỉ giao hàng:
                    </label>
                    <Typography>{cusAddress}</Typography>
                  </div>
                  <div className="form-group">
                    <label className="d-flex align-items-center">
                      Tên hàng:
                    </label>
                    <Typography>{cusOrders}</Typography>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="d-flex align-items-center">
                      Hình ảnh xác minh:
                    </label>
                    <input
                      type="file"
                      ref={files}
                      multiple
                      className="form-control"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateOrders}>
            Xác nhận đóng góp
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Delivery;
