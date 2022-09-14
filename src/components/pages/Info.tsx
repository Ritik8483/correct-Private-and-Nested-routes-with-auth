import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const navigate=useNavigate();
  console.log("CALLED");

  return (
    <div>
      <>
        {console.log("CALLED")}
        This is Info page!!
        <Button onClick={()=>navigate('/dashboard/info/more-info')}>More info</Button>
      </>
    </div>
  );
};

export default Info;
