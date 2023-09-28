import React from "react";

import { MdDeveloperMode } from "react-icons/md";
import { FiCodesandbox } from "react-icons/fi";
import { CgWebsite } from "react-icons/cg";
import Card from "./Crad";
import { StyledContainer, Cards } from "./style";

const Services = () => {
  return (
    <StyledContainer>
      <h4>
        My <span className="green">Services</span>
      </h4>
      <h1>What I Do</h1>
      <Cards>
        <Card
          Icon={CgWebsite}
          title={"Responsive web pages & designe"}
          disc={"ui/ux designer"}
        />
        <Card
          Icon={MdDeveloperMode}
          title={"MERN full Stack  Development"}
          disc={"Api Integrations & development."}
        />
        <Card
          Icon={FiCodesandbox}
          title={"Odoo ERP Moudules Customization"}
          disc={"Customize  odoo ERP Modules"}
        />
      </Cards>
    </StyledContainer>
  );
};

export default Services;
