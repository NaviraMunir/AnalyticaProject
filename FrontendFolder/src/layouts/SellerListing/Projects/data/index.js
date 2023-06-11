/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
// import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDProgress from "components/MDProgress";

// Images
// import logoXD from "assets/images/small-logos/logo-xd.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoJira from "assets/images/small-logos/logo-jira.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
import Rating from "@mui/material/Rating";
import LaunchIcon from '@mui/icons-material/Launch';

export default function data( Data ) {


  const Seller = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Seller", accessor: "seller", width: "30%", align: "left" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Rating", accessor: "rating", align: "center" },
      { Header: "Buy", accessor: "link", width: "15%", align: "center" },
    ],

    rows: 
      Data.map((item) =>({
          seller: <Seller name={item.seller} />,
          price: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.price}
            </MDTypography>
          ),
          rating: (
            <Rating name="read-only" value={item.rating} readOnly />
          ),
          link: (
            <LaunchIcon fontSize="medium" onClick={() => window.open(item.link, '_blank')} style={{ cursor: "pointer" }}/>
          ),
          }))
  };
}
