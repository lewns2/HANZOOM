import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Slider from 'react-slick';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const MatchList = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const settings = {
    dots: false, // 점은 안 보이게
    infinite: true, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 4, //4장씩 보이게 해주세요
    slidesToScroll: 4, //1장씩 넘어가세요
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="나눔" />
            <Tab label="교환" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Slider {...settings}>
            <div>가가가</div>
            <div>나나나</div>
            <div>다다다</div>
            <div>라라라</div>
            <div>마마마</div>
          </Slider>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Slider {...settings}>
            <div>AAA</div>
            <div>BBB</div>
            <div>CCC</div>
            <div>DDD</div>
            <div>EEE</div>
          </Slider>
        </TabPanel>
      </Box>
    </>
  );
};
