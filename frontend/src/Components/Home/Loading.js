import React, { useState, useEffect } from "react";

const Loading = ({ isLoading, setIsLoading }) => {
  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <h1>Loading...</h1>
        </div>
      )}

      {/* The rest of your application */}
    </>
  );
};

export default Loading;
