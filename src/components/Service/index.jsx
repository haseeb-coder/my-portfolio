import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { MdDeveloperMode } from 'react-icons/md';
import { FiCodesandbox } from 'react-icons/fi';
import { CgWebsite } from 'react-icons/cg';

import Card from './Crad';
import { StyledContainer, Cards } from './style';

const Services = () => {
  return (
    <StyledContainer id='services'>
      <Slide direction='down'>
        <h4>
          My <span className='green'>Services</span>
        </h4>
        <h1>What I Do</h1>
      </Slide>

      <Cards>
        <Slide direction='left'>
          <Card
            Icon={CgWebsite}
            title={'Responsive Web Design'}
            disc={
              <ul>
                <li>Engaging mobile-friendly layouts</li>
                <li>Optimized for all devices</li>
                <li>Enhanced user experience</li>
                <li>Customized to your brand and business needs</li>
                <li>Proven record of meeting deadlines</li>
                <li>High client satisfaction and successful projects</li>
              </ul>
            }
          />
        </Slide>
        <Slide direction='up'>
          <Card
            Icon={MdDeveloperMode}
            title={'MERN Full Stack Development'}
            disc={
              <ul>
                <li>Custom web applications tailored to your requirements</li>
                <li>Scalable architecture for future growth</li>
                <li>Intuitive UI/UX design for a seamless user experience</li>
                <li>Real-time features and interactive components</li>
                <li>Robust security measures and authentication</li>
                <li>Efficient RESTful API development</li>
                <li>Seamless integration with React.js</li>
                <li>Cloud-based deployment for flexibility</li>
                <li>Rigorous testing and debugging</li>
                <li>Ongoing maintenance and dedicated support</li>
                <li>Prompt project delivery</li>
              </ul>
            }
          />
        </Slide>

        <Slide direction='right'>
          <Card
            Icon={FiCodesandbox}
            title={'Odoo ERP Modules Customization'}
            disc={
              <ul>
                <li>Customized ERP solutions tailored to your business</li>
                <li>Development and seamless integration of custom modules</li>
                <li>Workflow optimization and automation</li>
                <li>User-friendly UI/UX enhancements</li>
                <li>Integration with existing systems</li>
                <li>Efficient data management and insightful reporting</li>
                <li>Scalability to support business growth</li>
                <li>Comprehensive training and dedicated support</li>
                <li>Continuous monitoring and timely updates</li>
                <li>Cost-effective solutions within your budget</li>
                <li>Proven expertise in Odoo ERP customization</li>
                <li>Adherence to project timelines</li>
              </ul>
            }
          />
        </Slide>
      </Cards>
    </StyledContainer>
  );
};

export default Services;
