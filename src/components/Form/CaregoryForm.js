import React, { useState } from "react";

const CaregoryForm = ({handlesubmit ,value,setValue}) => {
  return (
    <>
      <form onSubmit={handlesubmit}>
      <div style={{  alignItems:'center', display:'flex',justifyContent:'center', flexDirection:'column' }}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Category "
            value={value}
            onChange={(e) => setValue(e.target.value)}
            //style={{ width: '50%' }}
          />
        </div>
        <div style={{ marginTop:'15px' }}>
                <button type="submit" className="btn btn-primary">
                     Submit
                </button>
        </div>
        </div>
      </form>
    </>
  );
};

export default CaregoryForm;
