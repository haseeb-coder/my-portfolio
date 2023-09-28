import React from "react";
import PropTypes from "prop-types"; 
import { StyledContainer } from "./style";

const Project = (props) => {
  const { img, disc } = props.item;
  return (
    <StyledContainer>
      <img src={img} alt="project" />
      <div className="disc">
        <h1>Description</h1>
        <p>
          {disc}
          <a href="#">demo</a>
        </p>
      </div>
    </StyledContainer>
  );
};


Project.propTypes = {
  item: PropTypes.shape({
    img: PropTypes.string.isRequired, 
    disc: PropTypes.string.isRequired,
  }).isRequired,
};

export default Project;
