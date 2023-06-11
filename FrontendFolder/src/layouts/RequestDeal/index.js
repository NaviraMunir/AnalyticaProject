/**
=========================================================
* Analytica - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components

import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";

// Analytica components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Analytica example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
 import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

import MDInput from "components/MDInput";
import { NativeSelect,FormControl } from "@mui/material";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import axios from "axios";
// import dealsdata from "./data/dealsTableData";
import  dealsdata  from "./data/dealsTableData";
import allbidsdata from "./data/dealbidsTableData";
import confirmedbidsdata from "./data/confirmedbidsTableData";

function RequestDeal() {

  const [product, setProduct] = useState("Laptops");
  const [quantity, setQuantity] = useState("");
  const [budget, setBudget] = useState("");
  const [dealstatus, setDealstatus] = useState("open");
  const [DealsData, setDealsData] = useState([]);
  const [DealBidsData, setDealBidsData] = useState([]); 
  const [confirmedBidsData, setconfirmedBidsData] = useState([]); 


  const handledeals = () => {
    axios.post("http://localhost:5000/getdeals", { email: JSON.parse(sessionStorage.getItem("user")) })
    .then((response) => {
      const data = response.data.data || [];
      const test = data.map(item => ({
        dealid: item[0],
        dealproduct: item[1],
        dealquantity: item[2],
        dealbudget: item[3],
        dealstatus: item[4],
        dealrequestby: item[5],
        }));
        setDealsData(test);
    })
    .catch((error) => {
      console.log(error);
    });

    
  };

  
  const handlesallbids = () => {
    axios.post("http://localhost:5000/getdealbids", { email: JSON.parse(sessionStorage.getItem("user")) })
    .then((response) => {
      const data1 = response.data.data || [];
      const test = data1.map(item => ({
        dealbidid: item[0],
        dealbidproduct: item[1],
        dealbidquantity: item[2],
        dealbidamount: item[3],
        dealbidder: item[5],
        dealbidstatus: item[4],
        dealbidaccept: "accept",
        dealbidreject: "reject",
        }));
        setDealBidsData(test);
    })
    .catch((error) => {
      console.log(error);

    });
  };
 

  const handleconfirmedbids = () => {
    axios.post("http://localhost:5000/getacceptedbids", { email: JSON.parse(sessionStorage.getItem("user")) })
    .then((response) => {
      const data1 = response.data.data || [];
      const test = data1.map(item => ({
        confirmedproduct: item[0],
        confirmedquantity: item[1],
        confirmedamount: item[2],
        bidder: item[3],
        bidderemail: item[4],
        biddernumber: item[5],
        }));
        setconfirmedBidsData(test);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  const handleSubmit = () => {
    setDealstatus("open");
    axios.post("http://127.0.0.1:5000/requestdeal", { product, quantity, budget, dealstatus, requestBy:JSON.parse(sessionStorage.getItem("user")) })
      .then((response) => {
        console.log(response);
        if (response.data.data === "success") {
          alert("Deal Requested Successfully");
          handledeals();
        }
        else {
          alert("Deal Request Failed");
          console.log(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {bidcolumns, bidrows } = allbidsdata( DealBidsData, handleconfirmedbids,handlesallbids,handledeals);
  const {dealrows, dealcolumns}=dealsdata(DealsData, handlesallbids,handledeals);
  const {confirmedbidrows, confirmedbidcolumns}=confirmedbidsdata(confirmedBidsData);

  useEffect(() => {
    handledeals();
    handlesallbids();
    handleconfirmedbids();
  },[]);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Request a Deal
                </MDTypography>
              </MDBox>
              <Grid container spacing={4} mt={1} py={2} px={10}>
                <Grid item  xs={12} sm={6} md={3} p={1}>
                  <FormControl  >
                    <NativeSelect
                      defaultValue="Laptops"
                      inputProps={{
                        name: "product",
                        id: "product",
                      }}
                      onChange={(e) => setProduct(e.target.value)}
                    >
                    <option value="Laptops">Laptops</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="HomeAppliances">Home Appliances</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3} p={1}>
                  <MDBox  mb={2} mx={4}>
                    <MDInput
                      onChange={(e) => setQuantity(e.target.value)}
                      type="number"
                      label="Quantity"
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6} md={3} p={1}>
                  <MDBox mb={2} mx={4}>
                    <MDInput
                      onChange={(e) => setBudget(e.target.value)}
                      type="number"
                      label="Budget"
                    />
                </MDBox>
                </Grid>
                <Grid item xs={12} sm={6} md={3} p={1}>
                  <MDButton
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={handleSubmit}
                  mx={4}
                  >
                  Request Deal
                  </MDButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Card>
              <MDBox>
                <DataTable
                  table={{ columns:dealcolumns, rows:dealrows }}
                  showTotalEntries={false}
                  isSorted
                  noEndBorder
                  entriesPerPage={false}
                  tableHeading="My Deals"
                  canSearch
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Card>
              <MDBox>
              {bidcolumns!= null && bidrows != null ? (
                          <DataTable
                          table={{ columns: bidcolumns, rows: bidrows }}
                          showTotalEntries={false}
                          isSorted
                          noEndBorder
                          entriesPerPage={false}
                          tableHeading="Deal Bids"
                          canSearch
                          />
                          
                        ) : (
                          <p>Loading...</p>
                        )}
                </MDBox>   
            </Card>
          </Grid>
          
          <Grid item xs={12} mt={2}>
            <Card>
              <MDBox>
                <DataTable
                  table={{ columns:confirmedbidcolumns, rows:confirmedbidrows }}
                  showTotalEntries={false}
                  isSorted
                  noEndBorder
                  entriesPerPage={false}
                  canSearch
                  tableHeading="Confirmed Deals"
                />
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default RequestDeal;
